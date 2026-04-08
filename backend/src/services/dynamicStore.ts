import { randomUUID } from "crypto";
import type { DynamicQRRecord, QRConfig } from "shared";

interface QRStore {
  create(targetUrl: string, config: QRConfig): Promise<DynamicQRRecord>;
  get(id: string): Promise<DynamicQRRecord | null>;
  incrementClicks(id: string): Promise<void>;
}

class InMemoryQRStore implements QRStore {
  private store = new Map<string, DynamicQRRecord>();

  async create(targetUrl: string, config: QRConfig): Promise<DynamicQRRecord> {
    const record: DynamicQRRecord = {
      id: randomUUID(),
      targetUrl,
      config,
      createdAt: Date.now(),
      clicks: 0,
    };
    this.store.set(record.id, record);
    return record;
  }

  async get(id: string): Promise<DynamicQRRecord | null> {
    return this.store.get(id) ?? null;
  }

  async incrementClicks(id: string): Promise<void> {
    const record = this.store.get(id);
    if (record) {
      record.clicks += 1;
    }
  }
}

export const dynamicStore: QRStore = new InMemoryQRStore();
