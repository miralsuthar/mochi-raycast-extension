import axios from "axios";
export const imageUrlToBase64 = async (url: string) => {
  try {
    const image = await axios.get(url, { responseType: "arraybuffer" });
    const returnedB64 = Buffer.from(image.data).toString("base64");
    return returnedB64;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export function getChartColorConfig(id?: string) {
  let gradientFrom, gradientTo, borderColor;
  switch (id) {
    case "bitcoin":
      borderColor = "rgba(255, 163, 1, 1)";
      gradientFrom = "rgba(159,110,43,0.9)";
      gradientTo = "rgba(76,66,52,0.5)";
      break;
    case "ethereum":
    case "ethereum-pow-iou":
      borderColor = "rgba(169, 150, 242, 1)";
      gradientFrom = "rgba(108,136,217,0.9)";
      gradientTo = "rgba(74,93,148,0.5)";
      break;
    case "tether":
      borderColor = "rgba(34, 160, 122, 1)";
      gradientFrom = "rgba(46,78,71,0.9)";
      gradientTo = "rgba(48,63,63,0.5)";
      break;
    case "binancecoin" || "terra":
      borderColor = "rgba(245, 188, 0, 1)";
      gradientFrom = "rgba(172,136,41,0.9)";
      gradientTo = "rgba(73,67,55,0.5)";
      break;
    case "solana":
      borderColor = "rgba(153, 69, 255, 1)";
      gradientFrom = "rgba(116,62,184,0.9)";
      gradientTo = "rgba(61,53,83,0.5)";
      break;
    default:
      borderColor = "rgba(0, 156, 219, 1)";
      gradientFrom = "rgba(53,83,192,0.9)";
      gradientTo = "rgba(58,69,110,0.5)";
  }

  return {
    borderColor,
    gradientFrom,
    gradientTo,
  };
}
