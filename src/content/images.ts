import type { StaticImageData } from "next/image";

import guardsFormation from "../../public/images/operations/guards-formation.jpg";
import guardsHandshake from "../../public/images/operations/guards-handshake.jpg";
import vehicleSearch from "../../public/images/operations/vehicle-search.jpg";
import guardsLineUp from "../../public/images/operations/guards-line-up.jpg";
import guardsParade from "../../public/images/operations/guards-parade.jpg";
import nscdcTeam from "../../public/images/visits/nscdc-visit-team.jpg";
import nscdcOfficers from "../../public/images/visits/nscdc-visit-officers.jpg";
import nscdcMeeting from "../../public/images/visits/nscdc-visit-meeting.jpg";
import conference from "../../public/images/events/security-conference.jpg";
import certificate from "../../public/images/recognition/certificate-of-recognition.jpg";
import ceoPortrait from "../../public/images/leadership/cynthia-gregg-portrait.jpg";
import doctorateCeremony from "../../public/images/leadership/honorary-doctorate-ceremony.jpg";
import k9 from "../../public/images/services/k9-shepherd.jpg";
import cctv from "../../public/images/services/cctv-cameras.jpg";
import detectors from "../../public/images/services/walk-through-detectors.jpg";
import chauffeur from "../../public/images/services/chauffeur-door.jpg";

/**
 * Image registry. `kind` records where each photograph comes from, so nothing is
 * presented as company work when it is not:
 *  - company:  supplied by the client and showing Safety Signatures people or premises
 *  - press:    event photographs supplied by the client (ceremonies, conferences)
 *  - stand-in: openly licensed or previously published stock; never shown as company work
 */
export type SiteImage = {
  src: StaticImageData;
  alt: string;
  kind: "company" | "press" | "stand-in";
  /** Focal point for object-position. */
  focus?: string;
  credit?: { by: string; licence: string; url: string };
};

export const images = {
  guardsFormation: {
    src: guardsFormation,
    alt: "Safety Signatures security officers in navy and white uniform walking in formation",
    kind: "company",
    focus: "50% 35%",
  },
  guardsHandshake: {
    src: guardsHandshake,
    alt: "Safety Signatures officers gathered in uniform as two colleagues shake hands",
    kind: "company",
    focus: "55% 40%",
  },
  vehicleSearch: {
    src: vehicleSearch,
    alt: "Safety Signatures officers checking a car's boot at a gate before it enters",
    kind: "company",
    focus: "45% 55%",
  },
  guardsLineUp: {
    src: guardsLineUp,
    alt: "A line of Safety Signatures security officers standing at attention outside a building",
    kind: "company",
    focus: "50% 55%",
  },
  guardsParade: {
    src: guardsParade,
    alt: "Safety Signatures officers on a parade ground during drill",
    kind: "company",
    focus: "50% 45%",
  },
  nscdcTeam: {
    src: nscdcTeam,
    alt: "Officers of the Nigeria Security and Civil Defence Corps with Safety Signatures staff at the company's office",
    kind: "company",
    focus: "50% 40%",
  },
  nscdcOfficers: {
    src: nscdcOfficers,
    alt: "Two NSCDC officers in white uniform standing with a member of the Safety Signatures team in the company's office",
    kind: "company",
    focus: "50% 40%",
  },
  nscdcMeeting: {
    src: nscdcMeeting,
    alt: "An NSCDC officer in conversation with a member of the Safety Signatures team in an office",
    kind: "company",
    focus: "50% 50%",
  },
  conference: {
    src: conference,
    alt: "Speakers from the police, the military and private security standing together at a national security conference",
    kind: "press",
    focus: "50% 35%",
  },
  certificate: {
    src: certificate,
    alt: "A certificate of recognition naming Dr. Cynthia Gregg being presented at an awards ceremony",
    kind: "press",
    focus: "60% 50%",
  },
  ceoPortrait: {
    src: ceoPortrait,
    alt: "Portrait of Dr. Cynthia Gregg, Managing Director and CEO of Safety Signatures Limited",
    kind: "press",
    focus: "50% 30%",
  },
  doctorateCeremony: {
    src: doctorateCeremony,
    alt: "The stage at the September 2021 conferment ceremony of Ames Christian University and the International College of Ministry",
    kind: "press",
    focus: "50% 50%",
  },
  k9: {
    src: k9,
    alt: "An alert black German shepherd standing outdoors",
    kind: "stand-in",
    focus: "65% 50%",
    credit: {
      by: "Yama Zsuzsanna Márkus",
      licence: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Black-german-shepherd-29944091920.jpg",
    },
  },
  cctv: {
    src: cctv,
    alt: "Three CCTV cameras mounted on the parapet of a building",
    kind: "stand-in",
    focus: "50% 60%",
    credit: {
      by: "Fourhazzy",
      licence: "CC0",
      url: "https://commons.wikimedia.org/wiki/File:Closed-circuit_television_(CCTV)_cameras.jpg",
    },
  },
  detectors: {
    src: detectors,
    alt: "Walk-through metal detectors at the entrance of an office building",
    kind: "stand-in",
    focus: "55% 50%",
    credit: {
      by: "PQ77wd",
      licence: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Walk-through_metal_detectors_in_an_office_building.jpg",
    },
  },
  chauffeur: {
    src: chauffeur,
    alt: "A driver in a suit opening the rear door of a black car",
    kind: "stand-in",
    focus: "50% 50%",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/** Openly licensed photographs that need attribution in the footer credits. */
export const creditedImages = Object.values(images as Record<string, SiteImage>).filter((i) => i.credit);
