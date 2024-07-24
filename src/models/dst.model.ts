export class DST {
  domain: string;
  dst: string;

  constructor({ domain, dst }: { domain: string; dst: string }) {
    this.domain = domain;
    this.dst = dst;
  }

  static ofString(input: string) {
    return new DST(JSON.parse(input));
  }

  static async ofFile(input: File) {
    return new DST(JSON.parse(await input.text()));
  }
}
