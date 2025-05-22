import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { email, new_password, confirim_password } = createAdminDto;
    if (new_password !== confirim_password) {
      console.log(new_password);
      console.log(confirim_password);
      throw new BadRequestException("Parollar mos emas");
    }
    const existingAdmin = await this.adminRepo.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const password = await bcrypt.hash(new_password, 7);

    const newAdmin = this.adminRepo.create({ ...createAdminDto, password });
    return await this.adminRepo.save(newAdmin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.new_password) {
      if (updateAdminDto.new_password !== updateAdminDto.confirim_password) {
        throw new BadRequestException("Parollar mos emas");
      }
      updateAdminDto.new_password = await bcrypt.hash(
        updateAdminDto.new_password,
        7
      );
      delete updateAdminDto.confirim_password;
    }

    return this.adminRepo.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
  async updateToken(id: number, data: Partial<Admin>) {
    return this.adminRepo.update(id, data);
  }
}
