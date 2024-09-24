// home interface
export interface State {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  features: string;
}

export interface Faq {
  title: string;
  content: string;
  category: string;
}

export interface Faculties {
  title: string;
  content: string;
  category: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
// about page
export interface AboutPage {
  aboutus: {
    topDescription: string;
    topTitle: string;
    ourMission: string;
    ourVision: string;
    trusteeSection: {
      subTitle: string;
      title: string;
    };
    history: {
      [key: string]: string;
    };
  };
  seo: {
    metaDesc: string;
    title: string;
  };
}
// admission page
export interface Admissions {
  admissions: {
    bdesProgramme: {
      buttonLabel: string;
      buttonUrl: string;
      description: string;
    };
    specializations: {
      buttonText: string;
      buttonUrl: string;
      description: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    numbers: {
      numberContent: string;
    };
    programHighlights: {
      highlightsInfo: string;
      highlightImage: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    partnership: {
      description: string;
      logoList: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    whyMitIde: {
      iconList: string;
      description: string;
    };
    footerCta: {
      description: string;
      buttonText: string;
      buttonUrl: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    admissionDetails: {
      duration: string;
      eligibilityCriteria: string;
      fees: string;
      scholarships: string;
      selectionCriteria: string;
    };
    header: {
      headerContent: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
  };
  seo: {
    metaDesc: string;
    title: string;
  };
}
// all short desc
export interface AllSec {
  page: {
    home: {
      heroSlider: {
        slider1Content: string;
        slider1Image: {
          node: {
            mediaItemUrl: string;
          };
        };
        slider2VideoUrl?: string;
        slider3Content?: string;
        slider3Image?: {
          node?: {
            mediaItemUrl?: string;
          };
        };
      };
      about: {
        title: string;
        description: string;
        buttonText: string;
        buttonUrl: string;
        features: string;
      };

      ourCommunity?: {
        shortDescription: string;
      };
      newsEvent?: {
        shortDescription: string;
      };

      opportunities?: {
        shortDescription: string;
      };
      ourTopRecruiters?: {
        shortDescription: string;
      };
    };
    seo: {
      metaDesc: string;
      title: string;
    };
  };
}
// footer
export interface FooterData {
  footer?: {
    facebookUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    shortDescription?: string;
  };
  footerBottomContent?: {
    copyrightContent?: string;
  };
  footerMiddleContent?: {
    content1?: string;
    content2?: string;
    content3?: string;
    content4?: string;
  };
}
export interface heroSlider {
  slider1Content: string;
  slider1Image: {
    node: {
      mediaItemUrl: string;
    };
  };
  slider2VideoUrl?: string;
  slider3Content?: string;
  slider3Image?: {
    node?: {
      mediaItemUrl?: string;
    };
  };
}

export interface AllSec2 {
  heroSlider: {
    slider1Content: string;
    slider1Image: {
      node: {
        mediaItemUrl: string;
      };
    };
    slider2VideoUrl?: string;
    slider3Content?: string;
    slider3Image?: {
      node?: {
        mediaItemUrl?: string;
      };
    };
  };
  about: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    features: string;
  };
}

export interface UnitPageType {
  unitPageNumbers: string;
  unitPageTopDescription: {
    contentLeft: string;
    imageRight: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  banner: {
    bannerImage: {
      node: {
        mediaItemUrl: string;
      };
    };
    contentLeft: string;
  };
  gallery: {
    campus: string;
    eventsActivities: string;
    hostelRecreation: string;
    learningSpacesLabs: string;
    studentLedClubs: string;
  };
}

export interface Placement {
  title: string;
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}

export interface Centers {
  testCenterData: {
    date: string;
    time: string;
    description: string;
  };
  title: string;
}
