import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { JobOffer } from "./jobOffer.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { OfferStatus } from "../../Shared/Enums/offerStatus.enum";
import { offerRespones } from "./dto/offerRespones.dto";
import { ApplicationService } from "../application/application.service";

@Injectable()
export class OfferService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,

    @InjectRepository(JobOffer)
    private jobOfferRepository: Repository<JobOffer>,

    @Inject(forwardRef(()=>ApplicationService))
    private applicationService: ApplicationService,
  ) {}

  public async createOffer(data: Partial<JobOffer>, manger?: EntityManager) {
    const repo = manger
      ? manger.getRepository(JobOffer)
      : this.jobOfferRepository;

    const offer = repo.create(data);

    return repo.save(offer);
  }

  public async jobOfferRespones(
    userId: string,
    offerId: string,
    dto: offerRespones,
  ) {
    const offer = await this.jobOfferRepository.findOne({
      where: {
        id: offerId,
        application: {
          applicant: { user: { id: userId } },
        },
      },
    });

    if (!offer) throw new BadRequestException("there is no offer");

    if (offer.expiresAt.getTime() <= Date.now()) {
      throw new BadRequestException("Offer expires");
    }

    const { status } = dto;

    return await this.dataSource.transaction(async (manager) => {
      offer.status = status;
      offer.respondedAt = new Date();

      const Noffer = await manager.save(offer);

      if (Noffer.status === OfferStatus.REJECTED) {
        await this.applicationService.rejectCV(
          userId,
          offer.application.id,
          {
            reason: "applicant reject offer",
          },
          manager,
        );
      }

      return {
        data: { Noffer },
      };
    });
  }

  public async allOfferByApplicant(userId: string) {
    const offers = await this.jobOfferRepository
      .createQueryBuilder("offer")
      .leftJoin("offer.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("application.applicant", "applicant")
      .leftJoin("applicant.user", "user")

      .where("user.id = :userId", { userId })

      .select([
        "interview",

        "application",
        "company.id",
        "company.name",

        "job.id",
        "job.title",
      ])

      .getMany();

    if (!offers) throw new BadRequestException("there is no offer");

    return offers;
  }

  public async allOfferByCompany(userId: string) {
    const offers = await this.jobOfferRepository
      .createQueryBuilder("offer")
      .leftJoin("offer.application", "application")
      .leftJoin("application.job", "job")
      .leftJoin("job.company", "company")
      .leftJoin("company.user", "user")
      .leftJoin("application.applicant", "applicant")

      .where("user.id = :userId", { userId })

      .select([
        "interview",

        "application",
        "applicant.id",
        "applicant.name",

        "job.id",
        "job.title",
      ])

      .getMany();

    if (!offers) throw new BadRequestException("there is no offer");

    return offers;
  }
}
