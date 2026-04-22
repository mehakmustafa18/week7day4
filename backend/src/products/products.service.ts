import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient, gql } from 'graphql-request';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  category: string;
  description: string;
  nikePromo?: boolean;
  image: {
    url: string;
  };
}

interface HygraphProductsResponse {
  sneakers: Product[];
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private client: GraphQLClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('HYGRAPH_URL') ?? '';

    this.client = new GraphQLClient(url);
  }

  async findAll(): Promise<Product[]> {
    const query = gql`
      query GetProducts {
        sneakers {
          id
          name
          slug
          price
          discount
          category
          description
          nikePromo
          image {
            url
          }
        }
      }
    `;

    try {
      const data = await this.client.request<HygraphProductsResponse>(query);
      return data.sneakers;
    } catch (error) {
      this.logger.error('Failed to fetch products from Hygraph', error);
      throw error;
    }
  }

  async findOne(slug: string): Promise<Product | null> {
    const query = gql`
      query GetProduct($slug: String!) {
        sneaker(where: { slug: $slug }) {
          id
          name
          slug
          price
          discount
          category
          description
          nikePromo
          image {
            url
          }
        }
      }
    `;

    try {
      const data = await this.client.request<{ sneaker: Product }>(query, {
        slug,
      });
      return data.sneaker;
    } catch (error) {
      this.logger.error(`Failed to fetch product ${slug} from Hygraph`, error);
      throw error;
    }
  }
}