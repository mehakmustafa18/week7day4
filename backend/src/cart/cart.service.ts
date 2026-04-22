import { Injectable } from '@nestjs/common';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  sessionId: string;
  items: CartItem[];
  total: number;
}

@Injectable()
export class CartService {
  private carts: Map<string, CartItem[]> = new Map();

  private DEFAULT_SESSION = 'default-session';

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCart(sessionId: string = this.DEFAULT_SESSION): Cart {
    const items = this.carts.get(sessionId) ?? [];
    return {
      sessionId,
      items,
      total: this.calculateTotal(items),
    };
  }

  addItem(
    sessionId: string = this.DEFAULT_SESSION,
    item: Omit<CartItem, 'quantity'> & { quantity?: number },
  ): Cart {
    const items = this.carts.get(sessionId) ?? [];
    const existing = items.find((i) => i.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity ?? 1;
    } else {
      items.push({ ...item, quantity: item.quantity ?? 1 });
    }

    this.carts.set(sessionId, items);
    return this.getCart(sessionId);
  }

  updateItem(
    sessionId: string = this.DEFAULT_SESSION,
    productId: string,
    quantity: number,
  ): Cart {
    const items = this.carts.get(sessionId) ?? [];

    if (quantity <= 0) {
      return this.removeItem(sessionId, productId);
    }

    const item = items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }

    this.carts.set(sessionId, items);
    return this.getCart(sessionId);
  }

  removeItem(
    sessionId: string = this.DEFAULT_SESSION,
    productId: string,
  ): Cart {
    const items = this.carts.get(sessionId) ?? [];
    const filtered = items.filter((i) => i.productId !== productId);
    this.carts.set(sessionId, filtered);
    return this.getCart(sessionId);
  }

  clearCart(sessionId: string = this.DEFAULT_SESSION): Cart {
    this.carts.set(sessionId, []);
    return this.getCart(sessionId);
  }
}
