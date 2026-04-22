import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.getCart(sessionId);
  }

  @Post('add')
  addItem(
    @Body()
    body: {
      sessionId?: string;
      productId: string;
      name: string;
      price: number;
      image: string;
      quantity?: number;
    },
  ) {
    const { sessionId, ...item } = body;
    return this.cartService.addItem(sessionId, item);
  }

  @Patch('update')
  updateItem(
    @Body()
    body: {
      sessionId?: string;
      productId: string;
      quantity: number;
    },
  ) {
    return this.cartService.updateItem(
      body.sessionId,
      body.productId,
      body.quantity,
    );
  }

  @Delete('remove/:productId')
  removeItem(
    @Param('productId') productId: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.cartService.removeItem(sessionId, productId);
  }

  @Delete('clear')
  clearCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.clearCart(sessionId);
  }
}
