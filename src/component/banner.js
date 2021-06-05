import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const defaultImages = [
  {
    link: "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603934186952.jpg",
  },
  {
    link: "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603336859115.jpg",
  },
  {
    link: "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1601881795854.jpg",
  },
  {
    link: "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603934186952.jpg",
  },
  {
    link: "https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1600743091481.jpg",
  },
];

export default function Banner({ images, styleBanner }) {
  const [banner, setBanner] = useState(null);

  const fake = useMemo(() => {
    return [
      "https://picsum.photos/700",
      "https://picsum.photos/700",
      "https://picsum.photos/700",
      "https://picsum.photos/700",
    ];
  }, []);

  const _renderBanner = useCallback(() => {
    return (
      <SliderBox
        images={fake}
        autoplay
        circleLoop
        sliderBoxHeight={200}
        resizeMethod={"resize"}
        resizeMode={"cover"}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}
      />
    );
  }, [fake]);

  useEffect(() => {
    if (!images) {
      setBanner(images);
      return;
    }
    setBanner(
      defaultImages.map((elm) => {
        return elm.link;
      })
    );
  }, [images]);

  return (
    <View style={styleBanner || { width: "100%", height: 150 }}>
      {_renderBanner()}
    </View>
  );
}
