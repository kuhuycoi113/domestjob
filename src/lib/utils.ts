import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import VISA_NAMEASCIEs from "@/lib/visa_nameascii.json";
import PROVINCES from "@/lib/jp_provinces.json";
import MAPPING_IMAGES from "@/lib/mapping_images.json";
import MAPPING_EXCLUDE_IMAGES from "@/lib/mapping_exclude_images.json";
import { log } from "console";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSpecialCondition = (specialConditions: any) => {
  if (typeof specialConditions === "string") {
    specialConditions = specialConditions.split(", ");
  }
  return specialConditions ?? [];
};

export const WEAK_LANGUAGES = ["n4", "n5"];
export const STRONG_LANGUAGES = ["n1", "n2", "n3"];
export const SPECIAL_CONDITION_COLORS = ["#F2B92A", "#19A6DF", "#AFC536"];
export const VISA_COLORS: { [key: string]: string } = {
  "thực tập sinh 3 năm": "#19A6DF",
  "thực tập sinh 1 năm": "#46C2F5",
  "thực tập sinh 3 go": "#0D8DC8",
  "đặc định đầu việt tiếng yếu": "#AFC536",
  "đặc định đầu việt có tiếng": "#9EB524",
  "đặc định đầu nhật tiếng yếu": "#91A621",
  "đặc định đầu nhật có tiếng": "#6F8114",
  "đặc định đi mới": "#CFE64E",
  "kỹ sư đầu việt không tiếng": "#F2B92A",
  "kỹ sư đầu việt tiếng yếu": "#F8B714",
  "kỹ sư đầu việt có tiếng": "#FAB404",
  "kỹ sư đầu nhật không tiếng": "#F2B92A",
  "kỹ sư đầu nhật tiếng yếu": "#D59E16",
  "kỹ sư đầu nhật có tiếng": "#B18208",
  "kỹ sư không tiếng": "#F2B92A",
  "kỹ sư có tiếng": "#FAB404",
  "kỹ sư tiếng yếu": "#F8B714",
};

export function formatGender(input: any) {
  // if (!input?.length) {
  //   return null;
  // }
  // const validKeywords = ["nam", "nữ", "cả nam và nữ", "male", "female", "both", "MALE", "FEMALE", "BOTH"];

  // // Chuyển về chữ thường để so khớp không phân biệt hoa thường
  // const lowerInput = input.toLowerCase();

  // // Tìm tất cả từ hợp lệ có xuất hiện trong input
  // const result = validKeywords.filter(keyword => lowerInput.includes(keyword));

  // return result.join(", "); // hoặc trả về mảng `result` nếu bạn muốn giữ dạng array
  if (input === "MALE") {
    return "Nam";
  } else if (input === "FEMALE") {
    return "Nữ";
  } else if (input === "BOTH") {
    return "Cả nam và nữ";
  } else {
    return "";
  }
}

export const generateBulletJobCrawl = (data: any) => {
  const {
    visa = "",                // đặt giá trị mặc định
    job = "",
    career = "",
    languageLevel = "",
    numberRecruits,
    gender,
    aiContent,
    workLocation
  } = data ?? {};
  const rawVisa = getVisaWithLanguage(visa, languageLevel);
  let specialConditions = data?.specialConditions;
  specialConditions = formatSpecialCondition(specialConditions);
  const details = [
    rawVisa,
    job ?? career,
    workLocation,
    languageLevel,
    numberRecruits ? `${numberRecruits} ${formatGender(gender)}` : null,
    specialConditions ? specialConditions.join(",") : null,
    aiContent,
  ]
    .filter(Boolean)
    .join(", ");

  return details;
};

export const getVisaWithLanguage = (visa: string, languageLevel: string) => {
  const validVisas = Object.keys(VISA_COLORS);
  visa = visa?.toLowerCase()?.replaceAll("tokutei", "đặc định");
  if (visa === "đi mới" || visa === "thực tập sinh" || !visa?.length) {
    return "Thực tập sinh 3 năm";
  } else if (visa === "đặc định") {
    return "Đặc định đi mới";
  } else if (visa === "đặc định có tiếng" || visa === "đặc định") {
    visa = "Đặc định đầu việt";
  } else if (visa === "đặc định không tiếng") {
    return "Đặc định đầu việt tiếng yếu";
  } else if (visa === "kỹ sư không tiếng") {
    return "Kỹ sư đầu việt tiếng yếu";
  } else if (visa === "kỹ sư có tiếng") {
    visa = "Kỹ sư đầu việt";
  }
  if (validVisas.indexOf(visa) === -1) {
    languageLevel = languageLevel?.toLowerCase();
    if (!languageLevel?.length && visa.indexOf("kỹ sư") > -1) {
      visa += " không tiếng";
    } else if (STRONG_LANGUAGES.findIndex((item) => languageLevel?.indexOf(item) > -1) > -1) {
      visa += " có tiếng";
    } else {
      visa += " tiếng yếu";
    }
  }
  // if (validVisas.indexOf(visa) === -1) {
  //   return "thực tập sinh 3 năm";
  // }
  return visa;
};

export const findVisaByNameAscii = (nameAscii: string) => {
  return VISA_NAMEASCIEs.find((item) => item.nameAscii === nameAscii) ?? null;
};

export const convertQueryParamsToJobFilter = (queryParam: { [key: string]: any }) => {
  const filter: any = {};
  Object.keys(queryParam).forEach((key) => {
    const value = queryParam[key];
    let visaNameAscii = null;
    // filter visa
    if (key === "childrenCategoryID") {
      visaNameAscii = findVisaByNameAscii(value);
    } else if (key === "jobCategoryID") {
      visaNameAscii = findVisaByNameAscii(value);
    }
    if (!!visaNameAscii) {
      filter.visa = visaNameAscii.compareStr;
    }
    if (key === "career") {
      filter.career = value;
    }
    if (key === "jobs") {
      filter.jobs = value;
    }
    if (key === "workLocation") {
      filter.workLocation = value;
    }
    if (key === "languageLevel") {
      filter.languageLevel = value;
    }
    if (key === "gender") {
      filter.gender = value;
    }
    if (key === "fee") {
      filter.fee = value;
    }
    if (key === "basicSalary") {
      filter.basicSalary = value;
    }
    if (key === "fee") {
      filter.fee = value;
    }
    if (key === "specialConditions") {
      filter.specialConditions = value;
    }
    if (key === "keyword") {
      filter.keyword = value;
    }
  });
  return filter;
};

export const convertFilterToQuery = (filter: any, exchangeRates?: any) => {
  const queryGet: any = {
    query: {
      bool: {
        filter: [
          {
            bool: {
              must_not: [
                {
                  terms: {
                    "statusJob.keyword": ["FULL", "CLOSED", "CANCELED"],
                  },
                },
                {
                  term: {
                    "status.keyword": "PENDING",
                  },
                },
              ],
            },
          },
          {
            terms: {
              "country.keyword": ["Nhật Bản"],
            },
          },
          {
            terms: {
              "source.keyword": ["MANUAL", "Zalo", "ZALO", "zalo"],
            },
          },
        ],
        must: [],
      },
    },
  };
  // Xử lý trường hợp "keyword"
  if (filter?.keyword) {
    const keyword = filter.keyword.trim();
    if (keyword.length > 0) {
      queryGet.query.bool.must.push({
        multi_match: {
          query: keyword,
          type: "phrase",
          fields: ["code", "languageLevel", "workLocation", "career", "visa", "jobs", "gender", "specialConditions", "aiContent", "baseContent"],
        },
      });
    }
  }
  // Xử lý trường hợp "visa"
  if (filter?.visa) {
    queryGet.query.bool.must.push({
      prefix: {
        "visa.keyword": filter.visa,
      },
    });
  }
  // Xử lý trường hợp "career"
  if (filter?.career) {
    queryGet.query.bool.must.push({
      term: {
        "career.keyword": filter.career,
      },
    });
  }
  // Xử lý trường hợp "jobs"
  if (filter?.jobs && filter?.jobs?.length > 0) {
    const jobsArray = Array.isArray(filter.jobs) ? filter.jobs : [filter.jobs];
    queryGet.query.bool.must.push({
      terms: {
        "filter.job.value": jobsArray,
      },
    });
  }
  // Xử lý trường hợp "workLocation"
  if (filter?.workLocation) {
    const workLocationArray = Array.isArray(filter.workLocation) ? filter.workLocation : [filter.workLocation];
    const locationLabels = workLocationArray
      .map((val: string) => {
        const found = PROVINCES.find((p) => p.value === val);
        return found ? found.label : null;
      })
      .filter((label: string | null) => label !== null);
    if (locationLabels.length > 0) {
      queryGet.query.bool.must.push({
        bool: {
          should: locationLabels.map((label: any) => ({
            match_phrase: { workLocation: label },
          })),
          minimum_should_match: 1,
        },
      });
    }
  }
  // Xử lý trường hợp "gender"
  if (filter?.gender) {
    if (typeof filter?.gender === "object") {
      const genderValues = filter.gender.value === "BOTH" ? ["MALE", "FEMALE"] : [filter.gender.value];
      queryGet.query.bool.must.push({
        bool: {
          should: [...genderValues.map((gender) => ({ term: { "gender.keyword": gender } })), { bool: { must_not: { exists: { field: "gender" } } } }],
          minimum_should_match: 1,
        },
      });
    } else if (typeof filter?.gender === "string") {
      const genderValues = filter.gender === "BOTH" ? ["MALE", "FEMALE"] : [filter.gender];
      queryGet.query.bool.must.push({
        bool: {
          should: [...genderValues.map((gender) => ({ term: { "gender.keyword": gender } })), { bool: { must_not: { exists: { field: "gender" } } } }],
          minimum_should_match: 1,
        },
      });
    }
  }
  // Xử lý trường hợp "languageLevel"
  if (filter?.languageLevel) {
    console.log("hehehheeh",filter?.languageLevel)
    if (typeof filter?.languageLevel === "object") {
      if (filter.languageLevel.value === "Không yêu cầu tiếng") {
        queryGet.query.bool.must.push({
          bool: {
            should: [{ match_phrase: { languageLevel: "Không yêu cầu tiếng" } }, { term: { "languageLevel.keyword": "" } }],
            minimum_should_match: 1,
          },
        });
      } else if (["N1", "N2", "N3", "N4", "N5"].includes(filter.languageLevel.value)) {
        queryGet.query.bool.must.push({
          match_phrase: { languageLevel: filter.languageLevel.value },
        });
      }
    } else if (typeof filter?.languageLevel === "string") {
      if (filter.languageLevel === "Không yêu cầu tiếng") {
        queryGet.query.bool.must.push({
          bool: {
            should: [{ match_phrase: { languageLevel: "Không yêu cầu tiếng" } }, { term: { "languageLevel.keyword": "" } }],
            minimum_should_match: 1,
          },
        });
      } else if (["N1", "N2", "N3", "N4", "N5"].includes(filter.languageLevel)) {
        queryGet.query.bool.must.push({
          match_phrase: { languageLevel: filter.languageLevel },
        });
      }
    }
  }
  // Xử lý trường hợp "basicSalary"
  if (filter?.basicSalary && Array.isArray(filter.basicSalary) && filter.basicSalary.length === 2) {
    const getRateByCurCode = (code: any) => {
      if (code === "VND") return 1;
      return exchangeRates?.find((data: any) => data.fromCurrency === "VND" && data.toCurrency === code)?.value || 1;
    };
    const rateJPY = getRateByCurCode("JPY") || 1;
    const minVND = Number(filter.basicSalary[0]) * 1000000;
    const maxVND = Number(filter.basicSalary[1]) * 1000000;
    const minJPY = Math.floor(minVND * rateJPY);
    const maxJPY = Math.ceil(maxVND * rateJPY);
    queryGet.query.bool.must.push({
      range: {
        basicSalary: {
          gte: minJPY,
          lte: maxJPY,
        },
      },
    });
  }
  if (filter?.fee && Array.isArray(filter.fee) && filter.fee.length === 2) {
    const minFee = Number(filter.fee[0]);
    const maxFee = Number(filter.fee[1]);
    queryGet.query.bool.must.push({
      range: {
        basicSalary: {
          gte: minFee,
          lte: maxFee,
        },
      },
    });
  }
  // Xử lý trường hợp "specialConditions"
  // if (filter?.specialConditions) {
  //   const specialConditionsArray = Array.isArray(filter.specialConditions) ? filter.specialConditions : [filter.specialConditions];
  //   const locationLabels = specialConditionsArray
  //     .map((val: string) => {
  //       const found = SPECIAL_CONDITIONS.find((p) => p.value === val);
  //       return found ? found.label : null;
  //     })
  //     .filter((label: string | null) => label !== null);
  //   if (locationLabels.length > 0) {
  //     queryGet.query.bool.must.push({
  //       terms: {
  //         "specialConditions.keyword": locationLabels,
  //       },
  //     });
  //   }
  // }

  return queryGet;
};

export const getJobImage = (job: string, career: string) => {
  let mappingImage = MAPPING_IMAGES.find((item) => item.newJobs.indexOf(job) > -1);
  if (!mappingImage) {
    mappingImage = MAPPING_IMAGES.find((item) => item.newJobs.indexOf(career) > -1);
  }
  if (!mappingImage) {
    return "/img/sample/no-image.jpg";
  }
  if (mappingImage.images.length === 1) {
    return mappingImage.images[0];
  }
  let randomInt = Math.floor(Math.random() * mappingImage.images.length);
  while (MAPPING_EXCLUDE_IMAGES.indexOf(mappingImage.images[randomInt]) > -1) {
    randomInt = Math.floor(Math.random() * mappingImage.images.length);
  }
  return mappingImage.images[randomInt];
};