import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';

@Injectable()
export class ClineteService {
  
  constructor(
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>,
  ){}

  
  


}
