import { Get, Post, HttpStatus, Res, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Contact as ContactModel } from '@prisma/client';
import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from './interface';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Get()
  async getContacts(): Promise<
    ContactModel[] | { message: string; error: string }
  > {
    try {
      const contacts = await this.contactService.getContacts();
      return contacts;
    } catch (error) {
      return {
        message: 'Error getting contacts',
        error,
      };
    }
  }

  @Post()
  async createContact(@Res() res: Response, @Body() contact: Contact) {
    try {
      const newContact = await this.contactService.createContact(contact);
      return res.status(HttpStatus.OK).json({
        message: 'Contact has been created successfully',
        contact: newContact,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Cannot create contact',
        contact,
      });
    }
  }
}
