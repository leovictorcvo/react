export default interface ICacheProvider {
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  save(key: string, value: string): Promise<void>;
}
