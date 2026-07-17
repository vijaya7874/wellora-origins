import { Injectable, computed, signal } from '@angular/core';
import { JarIcon } from '../components/jar-svg/jar-svg.component';

export interface CartItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  jar: { icon: JarIcon; top: string; bottom: string; sub: string };
  quantity: number;
}

export type CartItemInput = Omit<CartItem, 'quantity'>;

const SHIPPING_FLAT_RATE = 49;
const FREE_SHIPPING_THRESHOLD = 799;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();

  readonly totalCount = computed(() => this._items().reduce((sum, i) => sum + i.quantity, 0));

  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.quantity * i.price, 0)
  );

  readonly shipping = computed(() => {
    const sub = this.subtotal();
    if (sub === 0 || sub >= FREE_SHIPPING_THRESHOLD) return 0;
    return SHIPPING_FLAT_RATE;
  });

  readonly total = computed(() => this.subtotal() + this.shipping());

  readonly amountToFreeShipping = computed(() =>
    Math.max(0, FREE_SHIPPING_THRESHOLD - this.subtotal())
  );

  add(product: CartItemInput, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { ...product, quantity }];
    });
  }

  setQuantity(id: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }
    this._items.update((items) => items.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  increment(id: string): void {
    this._items.update((items) =>
      items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }

  decrement(id: string): void {
    const item = this._items().find((i) => i.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      this.remove(id);
    } else {
      this._items.update((items) =>
        items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      );
    }
  }

  remove(id: string): void {
    this._items.update((items) => items.filter((i) => i.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }
}
