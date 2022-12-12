import { BadRequestException, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('companies')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }


    @Get("/")
    async getAllCompanies(@Request() req: any) {
        return this.dashboardService.getAllCompanies(req.query);
    }

    @Get("details")
    async getCompanyDetails(@Request() req: any) {
        return this.dashboardService.getByID(req.query.company_id);
    }

    @Get("addresses")
    async getUserNotifications(@Request() req: any) {
        return this.dashboardService.getAddresses(req.query.company_id);
    }

    @Post("verifyCode")
    async verifyCompanyCode(@Request() req: any) {
        return this.dashboardService.verifyCompanyCode(req.body.code);
    }

    @Post("requestcompanycode")
    async requestcompanycode(@Request() req: any) {
        if (!req.body.search) {
            throw new BadRequestException("Missing field error search");
        }
        return this.dashboardService.sendCompanyCodeMail(req.body.search);
    }

}
