import { Injectable } from '@nestjs/common';
import {
  CreateAdminDto,
  UpdateAdminDto,
  UpdateAdminPasswordDto,
} from 'src/core/dtos/request/admin.dto';
import { AdminModel } from 'src/core/models';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';

@Injectable()
export class AdminUserFactoryService {
  createNewAdmin(createAdminDto: CreateAdminDto) {
    const admin = new AdminModel();
    admin.name = createAdminDto.name;
    admin.email = createAdminDto.email;
    admin.password = createAdminDto.password;
    admin.role = AdminRoleEnum.ADMIN;
    return admin;
  }

  updateAdmin(updateAdminDto: UpdateAdminDto) {
    const newAdmin = new AdminModel();
    newAdmin.name = updateAdminDto.name;
    return newAdmin;
  }

  updateAdminPassword(updateAdminPasswordDto: UpdateAdminPasswordDto) {
    const newAdmin = new AdminModel();
    newAdmin.password = updateAdminPasswordDto.newPassword;
    return newAdmin;
  }
}
