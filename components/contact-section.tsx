import {
  DiscordLogo,
  EnvelopeSimple,
  LinkedinLogo,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteContent } from "@/content/site";
import { RevealText } from "@/components/reveal-text";

const contactLinks = [
  { label: "LinkedIn", href: siteContent.socials.linkedin, icon: LinkedinLogo },
  { label: "Telegram", href: siteContent.socials.telegram, icon: TelegramLogo },
  {
    label: "Email",
    href: siteContent.email ? `mailto:${siteContent.email}` : "",
    icon: EnvelopeSimple,
  },
  { label: "Discord", href: siteContent.socials.discord, icon: DiscordLogo },
];

export function ContactSection() {
  return (
    <footer id="contact" className="contact-shell">
      <div className="contact-main">
        <h2>
          <RevealText text="Let's build something players remember." />
        </h2>
        <p>
          Partnerships, publishing, and thoughtful collaborations are welcome.
        </p>
        <div className="contact-icons" aria-label="Contact links">
          {contactLinks.map(({ label, href, icon: Icon }) =>
            href ? (
              <a
                className="contact-icon"
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                aria-label={label}
                title={label}
              >
                <Icon aria-hidden size={24} weight="regular" />
              </a>
            ) : (
              <span
                className="contact-icon is-disabled"
                key={label}
                aria-label={`${label} link coming soon`}
                aria-disabled="true"
                title={`${label} link coming soon`}
              >
                <Icon aria-hidden size={24} weight="regular" />
              </span>
            ),
          )}
        </div>
      </div>

      <div className="footer-line">
        <span>© {new Date().getFullYear()} NightSync Studio</span>
        <span>Built for the night shift</span>
      </div>
    </footer>
  );
}
