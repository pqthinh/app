import React, {useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
// import FastImage from 'react-native-fast-image'

const defaultImages = [
    {"link":"https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603934186952.jpg"},
    {"link":"https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603336859115.jpg"},
    {"link":"https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1601881795854.jpg"},
    {"link":"https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1603934186952.jpg"},
    {"link":"https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1600743091481.jpg"}
]

const fake = [
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700",
    "https://picsum.photos/700"
]

export default function Banner (props) {
    const { images, styleBanner } = props;
    const [banner, setBanner] = useState(null);
    useEffect(()=>{
        if(!images) {
            let imgs = defaultImages.map(elm=>{
                return elm.link;
            })
            setBanner(imgs);
        }
        else setBanner(images);
    },[images]);

    return (
        <View  style={styleBanner || { width: '100%', height: 150}}>
            <SliderBox 
                // ImageComponent={FastImage}
                images={fake}
                autoplay
                circleLoop
                sliderBoxHeight={200}
                resizeMethod={'resize'}
                resizeMode={'cover'}
                paginationBoxStyle={{
                    position: "absolute",
                    bottom: 0,
                    padding: 0,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingVertical: 10
                }}
                
            />
        </View>
    )
}