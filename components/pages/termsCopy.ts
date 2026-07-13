import type { Locale } from "@/lib/i18n";

/**
 * Bilingual copy for the Terms & Conditions page (EN source + VI translation).
 * Structure mirrors the JSX in TermsContent; inline emphasis/links are expressed
 * as {pre, b/link, post} segment fields so markup stays in the component while all
 * words live here. VI is proper legal Vietnamese; defined terms stay capitalized.
 */
export type TermsCopy = {
  onThisPage: string;
  contactLabel: string;
  crumbHome: string;
  crumbCurrent: string;
  h1: string;
  /** {entity} is interpolated by the component. */
  subtitle: string;
  lastUpdated: string;
  toc: string[];
  intro: { p: string; hi: { pre: string; link: string; post: string } };
  defsTerms: {
    affiliate: string; country: string; company: string; device: string;
    service: string; terms: string; social: string; you: string;
  };
  s1: {
    h: string; p: string;
    affiliate: string; country: string;
    companySuffix: string; // after "{entity}, {address}"
    device: string;
    servicePre: string; servicePost: string; // link between
    terms: string; social: string; you: string;
  };
  s2: { h: string; p1: string; p2: { pre: string; link: string; post: string } };
  s3: { h: string; p: string; warn: string };
  s4: { h: string; p1: string; p2: string };
  s5: { h: string; p: { pre: string; b: string; post: string }; warn: string; note: string };
  s6: { h: string; p: { pre: string; b1: string; mid: string; b2: string; post: string }; p2: string; note: string };
  s7: { h: string; p: { pre: string; b: string; post: string } };
  s8: { h: string; pre: string; mid: string; contactText: string; post: string };
  s9: { h: string; p: string };
  s10: { h: string; p: string; bullets: string[] };
  s11: { h: string; sevH: string; sevP: string; waiveH: string; waiveP: string };
  s12: { h: string; p: { pre: string; b: string; post: string } };
  s13: { h: string; p: { pre: string; b: string; post: string }; hi: { pre: string; b: string; post: string } };
  s14: { h: string; p: string; contactText: string };
  cta: { h2: string; p: string; bookDemo: string };
};

const en: TermsCopy = {
  onThisPage: "On this page",
  contactLabel: "Questions about these terms?",
  crumbHome: "Home",
  crumbCurrent: "Terms & Conditions",
  h1: "Terms & Conditions",
  subtitle: "The agreement between you and {entity} governing use of our Service.",
  lastUpdated: "Last updated:",
  toc: [
    "Interpretation & Definitions", "Acknowledgment", "Links to Other Websites", "Termination",
    "Limitation of Liability", '"AS IS" Disclaimer', "Governing Law", "Disputes Resolution",
    "EU Users", "US Legal Compliance", "Severability & Waiver", "Translation",
    "Changes to Terms", "Contact Us",
  ],
  intro: {
    p: "Please read these Terms and Conditions carefully before using our Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part, you may not access the Service.",
    hi: {
      pre: "You represent that you are over the age of 18. D3 does not permit those under 18 to use the Service. Your use of the Service is also conditioned on your acceptance of our ",
      link: "Privacy Policy",
      post: ".",
    },
  },
  defsTerms: {
    affiliate: "Affiliate", country: "Country", company: "Company", device: "Device",
    service: "Service", terms: "Terms", social: "Third-party Social Media", you: "You",
  },
  s1: {
    h: "Interpretation & Definitions",
    p: "Words with an initial capital letter have meanings defined below. These definitions apply equally in singular and plural form.",
    affiliate: "An entity that controls, is controlled by, or is under common control with a party (50%+ ownership of voting securities).",
    country: "North Carolina, United States",
    companySuffix: ' — referred to as "We", "Us", or "Our".',
    device: "Any device that can access the Service — computer, cellphone, or digital tablet.",
    servicePre: "The Website at ", servicePost: ".",
    terms: "These Terms and Conditions — the entire agreement between You and the Company.",
    social: "Services or content provided by third parties that may be displayed or made available through the Service.",
    you: "The individual or legal entity accessing or using the Service.",
  },
  s2: {
    h: "Acknowledgment",
    p1: "These Terms govern your use of the Service and form the agreement between you and {entity}. They apply to all visitors, users, and others who access or use the Service.",
    p2: {
      pre: "By accessing or using the Service you agree to be bound by these Terms and our ",
      link: "Privacy Policy",
      post: ". If you disagree with any part of these Terms, you may not access the Service.",
    },
  },
  s3: {
    h: "Links to Other Websites",
    p: "Our Service may contain links to third-party websites or services not owned or controlled by {entity}.",
    warn: "The Company assumes no responsibility for the content, privacy policies, or practices of third-party sites. We strongly advise you to read the terms and privacy policies of any third-party site you visit.",
  },
  s4: {
    h: "Termination",
    p1: "We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including if you breach these Terms.",
    p2: "Upon termination, your right to use the Service ceases immediately.",
  },
  s5: {
    h: "Limitation of Liability",
    p: {
      pre: "The entire liability of the Company and its suppliers under any provision of these Terms shall be limited to the amount actually paid by you through the Service, or ",
      b: "100 USD",
      post: " if you have not made any purchases.",
    },
    warn: "To the maximum extent permitted by law, the Company shall not be liable for any special, incidental, indirect, or consequential damages — including loss of profits, loss of data, business interruption, or personal injury — arising from your use of or inability to use the Service.",
    note: "Some states do not allow exclusion of implied warranties or limitation of liability for incidental damages; in those states, liability will be limited to the greatest extent permitted by law.",
  },
  s6: {
    h: '"AS IS" and "AS AVAILABLE" Disclaimer',
    p: {
      pre: "The Service is provided to you ",
      b1: '"AS IS"',
      mid: " and ",
      b2: '"AS AVAILABLE"',
      post: " with all faults and without warranty of any kind. To the maximum extent permitted by law, the Company expressly disclaims all warranties — express, implied, or statutory — including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
    },
    p2: "The Company makes no warranty that the Service will meet your requirements, be uninterrupted, error-free, or free of viruses or other harmful components.",
    note: "Some jurisdictions do not allow certain warranty exclusions — in such cases, the above exclusions apply to the greatest extent enforceable under applicable law.",
  },
  s7: {
    h: "Governing Law",
    p: {
      pre: "The laws of ",
      b: "North Carolina, United States",
      post: " — excluding its conflicts-of-law rules — govern these Terms and your use of the Service. Your use may also be subject to other local, state, national, or international laws.",
    },
  },
  s8: {
    h: "Disputes Resolution",
    pre: "If you have any concern or dispute about the Service, you agree to first try to resolve it informally by contacting us directly at ",
    mid: " or via the ",
    contactText: "contact page",
    post: ".",
  },
  s9: {
    h: "For European Union (EU) Users",
    p: "If you are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you reside.",
  },
  s10: {
    h: "United States Legal Compliance",
    p: "You represent and warrant that:",
    bullets: [
      'You are not located in a country subject to a United States government embargo or designated as a "terrorist supporting" country.',
      "You are not listed on any United States government list of prohibited or restricted parties.",
    ],
  },
  s11: {
    h: "Severability & Waiver",
    sevH: "Severability",
    sevP: "If any provision of these Terms is held unenforceable or invalid, it will be modified to accomplish its objectives to the greatest extent possible and the remaining provisions will continue in full force.",
    waiveH: "Waiver",
    waiveP: "Failure to exercise a right or require performance of an obligation shall not affect that party's ability to do so at a later time, nor shall a waiver of any breach constitute a waiver of subsequent breaches.",
  },
  s12: {
    h: "Translation Interpretation",
    p: {
      pre: "These Terms may be translated if made available in other languages on our Service. In the case of a dispute, ",
      b: "the original English text shall prevail",
      post: ".",
    },
  },
  s13: {
    h: "Changes to These Terms",
    p: {
      pre: "We reserve the right to modify or replace these Terms at any time at our sole discretion. For material changes, we will make reasonable efforts to provide at least ",
      b: "30 days' notice",
      post: " before the new terms take effect.",
    },
    hi: {
      pre: "By continuing to use the Service after revisions take effect, you agree to the revised terms. If you do not agree, please stop using the Service. These Terms were last updated on ",
      b: "{date}",
      post: ".",
    },
  },
  s14: {
    h: "Contact Us",
    p: "If you have any questions about these Terms and Conditions, please reach out:",
    contactText: "Contact page",
  },
  cta: {
    h2: "Questions about using D3?",
    p: "Our team is happy to walk you through what's included in your plan.",
    bookDemo: "Book a Demo",
  },
};

const vi: TermsCopy = {
  onThisPage: "Trong trang này",
  contactLabel: "Có câu hỏi về điều khoản?",
  crumbHome: "Trang chủ",
  crumbCurrent: "Điều Khoản & Điều Kiện",
  h1: "Điều Khoản & Điều Kiện",
  subtitle: "Thỏa thuận giữa bạn và {entity} về việc sử dụng Dịch Vụ của chúng tôi.",
  lastUpdated: "Cập nhật lần cuối:",
  toc: [
    "Giải Thích & Định Nghĩa", "Chấp Thuận", "Liên Kết Đến Website Khác", "Chấm Dứt",
    "Giới Hạn Trách Nhiệm", 'Tuyên Bố "Nguyên Trạng"', "Luật Áp Dụng", "Giải Quyết Tranh Chấp",
    "Người Dùng EU", "Tuân Thủ Pháp Luật Hoa Kỳ", "Hiệu Lực Từng Phần & Khước Từ", "Bản Dịch",
    "Thay Đổi Điều Khoản", "Liên Hệ",
  ],
  intro: {
    p: "Vui lòng đọc kỹ các Điều Khoản và Điều Kiện này trước khi sử dụng Dịch Vụ của chúng tôi. Bằng việc truy cập hoặc sử dụng Dịch Vụ, bạn đồng ý chịu ràng buộc bởi các Điều Khoản này. Nếu bạn không đồng ý với bất kỳ phần nào, bạn không được phép truy cập Dịch Vụ.",
    hi: {
      pre: "Bạn xác nhận rằng bạn đã trên 18 tuổi. D3 không cho phép người dưới 18 tuổi sử dụng Dịch Vụ. Việc bạn sử dụng Dịch Vụ cũng tùy thuộc vào việc bạn chấp nhận ",
      link: "Chính Sách Bảo Mật",
      post: " của chúng tôi.",
    },
  },
  defsTerms: {
    affiliate: "Đơn Vị Liên Kết", country: "Quốc Gia", company: "Công Ty", device: "Thiết Bị",
    service: "Dịch Vụ", terms: "Điều Khoản", social: "Mạng Xã Hội Bên Thứ Ba", you: "Bạn",
  },
  s1: {
    h: "Giải Thích & Định Nghĩa",
    p: "Những từ có chữ cái đầu viết hoa mang ý nghĩa được định nghĩa dưới đây. Các định nghĩa này áp dụng như nhau ở dạng số ít và số nhiều.",
    affiliate: "Một đơn vị kiểm soát, chịu sự kiểm soát, hoặc cùng chịu sự kiểm soát chung với một bên (sở hữu từ 50% quyền biểu quyết trở lên).",
    country: "North Carolina, Hoa Kỳ",
    companySuffix: ' — được gọi là "Chúng Tôi" hoặc "Của Chúng Tôi".',
    device: "Bất kỳ thiết bị nào có thể truy cập Dịch Vụ — máy tính, điện thoại di động hoặc máy tính bảng.",
    servicePre: "Website tại ", servicePost: ".",
    terms: "Các Điều Khoản và Điều Kiện này — toàn bộ thỏa thuận giữa Bạn và Công Ty.",
    social: "Các dịch vụ hoặc nội dung do bên thứ ba cung cấp, có thể được hiển thị hoặc cung cấp thông qua Dịch Vụ.",
    you: "Cá nhân hoặc pháp nhân truy cập hoặc sử dụng Dịch Vụ.",
  },
  s2: {
    h: "Chấp Thuận",
    p1: "Các Điều Khoản này điều chỉnh việc bạn sử dụng Dịch Vụ và hình thành thỏa thuận giữa bạn và {entity}. Chúng áp dụng cho tất cả khách truy cập, người dùng và những người khác truy cập hoặc sử dụng Dịch Vụ.",
    p2: {
      pre: "Bằng việc truy cập hoặc sử dụng Dịch Vụ, bạn đồng ý chịu ràng buộc bởi các Điều Khoản này và ",
      link: "Chính Sách Bảo Mật",
      post: " của chúng tôi. Nếu bạn không đồng ý với bất kỳ phần nào của các Điều Khoản này, bạn không được truy cập Dịch Vụ.",
    },
  },
  s3: {
    h: "Liên Kết Đến Các Website Khác",
    p: "Dịch Vụ của chúng tôi có thể chứa các liên kết đến những website hoặc dịch vụ của bên thứ ba không thuộc sở hữu hoặc kiểm soát của {entity}.",
    warn: "Công Ty không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc hoạt động của các website bên thứ ba. Chúng tôi đặc biệt khuyên bạn nên đọc kỹ điều khoản và chính sách bảo mật của bất kỳ website bên thứ ba nào bạn truy cập.",
  },
  s4: {
    h: "Chấm Dứt",
    p1: "Chúng tôi có thể chấm dứt hoặc tạm ngưng quyền truy cập của bạn ngay lập tức, không cần báo trước hoặc chịu trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm cả khi bạn vi phạm các Điều Khoản này.",
    p2: "Khi chấm dứt, quyền sử dụng Dịch Vụ của bạn lập tức kết thúc.",
  },
  s5: {
    h: "Giới Hạn Trách Nhiệm",
    p: {
      pre: "Toàn bộ trách nhiệm của Công Ty và các nhà cung cấp theo bất kỳ điều khoản nào trong các Điều Khoản này sẽ được giới hạn ở số tiền bạn thực sự đã thanh toán qua Dịch Vụ, hoặc ",
      b: "100 USD",
      post: " nếu bạn chưa thực hiện bất kỳ giao dịch mua nào.",
    },
    warn: "Trong phạm vi tối đa pháp luật cho phép, Công Ty sẽ không chịu trách nhiệm cho bất kỳ thiệt hại đặc biệt, ngẫu nhiên, gián tiếp hoặc mang tính hệ quả nào — bao gồm mất lợi nhuận, mất dữ liệu, gián đoạn kinh doanh hoặc thương tích cá nhân — phát sinh từ việc bạn sử dụng hoặc không thể sử dụng Dịch Vụ.",
    note: "Một số tiểu bang không cho phép loại trừ các bảo đảm ngầm định hoặc giới hạn trách nhiệm đối với thiệt hại ngẫu nhiên; tại những tiểu bang đó, trách nhiệm sẽ được giới hạn ở mức tối đa mà pháp luật cho phép.",
  },
  s6: {
    h: 'Tuyên Bố "Nguyên Trạng" và "Theo Tình Trạng Sẵn Có"',
    p: {
      pre: "Dịch Vụ được cung cấp cho bạn theo nguyên tắc ",
      b1: '"NGUYÊN TRẠNG"',
      mid: " và ",
      b2: '"THEO TÌNH TRẠNG SẴN CÓ"',
      post: " với mọi lỗi và không kèm theo bất kỳ bảo đảm nào. Trong phạm vi tối đa pháp luật cho phép, Công Ty từ chối rõ ràng mọi bảo đảm — dù rõ ràng, ngầm định hay theo luật định — bao gồm bảo đảm về khả năng thương mại, sự phù hợp cho một mục đích cụ thể, và không vi phạm.",
    },
    p2: "Công Ty không bảo đảm rằng Dịch Vụ sẽ đáp ứng yêu cầu của bạn, hoạt động không bị gián đoạn, không có lỗi, hoặc không có virus và các thành phần gây hại khác.",
    note: "Một số khu vực pháp lý không cho phép một số loại trừ bảo đảm nhất định — trong những trường hợp đó, các loại trừ nêu trên áp dụng ở mức tối đa có thể thực thi theo luật hiện hành.",
  },
  s7: {
    h: "Luật Áp Dụng",
    p: {
      pre: "Luật pháp của ",
      b: "North Carolina, Hoa Kỳ",
      post: " — không bao gồm các quy tắc xung đột pháp luật — điều chỉnh các Điều Khoản này và việc bạn sử dụng Dịch Vụ. Việc bạn sử dụng cũng có thể tuân theo các luật địa phương, tiểu bang, quốc gia hoặc quốc tế khác.",
    },
  },
  s8: {
    h: "Giải Quyết Tranh Chấp",
    pre: "Nếu bạn có bất kỳ thắc mắc hoặc tranh chấp nào về Dịch Vụ, bạn đồng ý trước tiên cố gắng giải quyết một cách thiện chí bằng cách liên hệ trực tiếp với chúng tôi qua ",
    mid: " hoặc qua ",
    contactText: "trang liên hệ",
    post: ".",
  },
  s9: {
    h: "Đối Với Người Dùng Liên Minh Châu Âu (EU)",
    p: "Nếu bạn là người tiêu dùng thuộc Liên minh Châu Âu, bạn sẽ được hưởng mọi quy định bắt buộc của luật pháp tại quốc gia bạn cư trú.",
  },
  s10: {
    h: "Tuân Thủ Pháp Luật Hoa Kỳ",
    p: "Bạn cam đoan và bảo đảm rằng:",
    bullets: [
      'Bạn không ở tại quốc gia chịu lệnh cấm vận của chính phủ Hoa Kỳ hoặc bị chỉ định là quốc gia "hỗ trợ khủng bố".',
      "Bạn không nằm trong bất kỳ danh sách các bên bị cấm hoặc bị hạn chế nào của chính phủ Hoa Kỳ.",
    ],
  },
  s11: {
    h: "Hiệu Lực Từng Phần & Khước Từ",
    sevH: "Hiệu Lực Từng Phần",
    sevP: "Nếu bất kỳ điều khoản nào trong các Điều Khoản này bị xem là không thể thực thi hoặc vô hiệu, điều khoản đó sẽ được điều chỉnh để đạt được mục tiêu của nó ở mức tối đa có thể, và các điều khoản còn lại vẫn tiếp tục có hiệu lực đầy đủ.",
    waiveH: "Khước Từ",
    waiveP: "Việc không thực hiện một quyền hoặc không yêu cầu thực hiện một nghĩa vụ sẽ không ảnh hưởng đến khả năng thực hiện điều đó sau này, và việc khước từ đối với một vi phạm cũng không cấu thành việc khước từ đối với các vi phạm tiếp theo.",
  },
  s12: {
    h: "Giải Thích Bản Dịch",
    p: {
      pre: "Các Điều Khoản này có thể được dịch nếu được cung cấp bằng các ngôn ngữ khác trên Dịch Vụ của chúng tôi. Trong trường hợp có tranh chấp, ",
      b: "văn bản tiếng Anh gốc sẽ được ưu tiên áp dụng",
      post: ".",
    },
  },
  s13: {
    h: "Thay Đổi Đối Với Điều Khoản",
    p: {
      pre: "Chúng tôi có quyền sửa đổi hoặc thay thế các Điều Khoản này bất kỳ lúc nào theo toàn quyền quyết định của mình. Đối với những thay đổi quan trọng, chúng tôi sẽ nỗ lực hợp lý để thông báo trước ít nhất ",
      b: "30 ngày",
      post: " trước khi điều khoản mới có hiệu lực.",
    },
    hi: {
      pre: "Bằng việc tiếp tục sử dụng Dịch Vụ sau khi các sửa đổi có hiệu lực, bạn đồng ý với các điều khoản đã sửa đổi. Nếu bạn không đồng ý, vui lòng ngừng sử dụng Dịch Vụ. Các Điều Khoản này được cập nhật lần cuối vào ngày ",
      b: "{date}",
      post: ".",
    },
  },
  s14: {
    h: "Liên Hệ Với Chúng Tôi",
    p: "Nếu bạn có bất kỳ câu hỏi nào về các Điều Khoản và Điều Kiện này, vui lòng liên hệ:",
    contactText: "Trang liên hệ",
  },
  cta: {
    h2: "Có câu hỏi về việc sử dụng D3?",
    p: "Đội ngũ của chúng tôi sẵn sàng hướng dẫn bạn những gì có trong gói của bạn.",
    bookDemo: "Đặt Demo",
  },
};

export const termsCopy: Record<Locale, TermsCopy> = { en, vi };
