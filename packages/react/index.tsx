import { Emweb } from "./emweb";
import { OEmbed } from "./oembed";

export function Embed({ url }: { url: string }) {
  return (
    <Emweb url={url}>
      <OEmbed url={url} />
    </Emweb>
  );
}
