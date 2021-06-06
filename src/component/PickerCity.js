import React, { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { withEmpty, withNumber } from "exp-value";

const PickerCity = ({ khuVuc, setKhuVuc, ...others }) => {
  const city = useMemo(() => {
    return require("../assets/location/tinh_tp.json");
  }, []);

  return (
    <TouchableOpacity {...others}>
      <Picker
        selectedValue={khuVuc}
        onValueChange={(itemValue, itemIndex) => setKhuVuc(itemValue)}
        style={{
          fontSize: 12,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {withNumber("length", city) > 0 &&
          city.map((item, index) => {
            return (
              <Picker.Item
                label={withEmpty("name_with_type", item)}
                value={withEmpty("name", item)}
                key={index}
              />
            );
          })}
      </Picker>
    </TouchableOpacity>
  );
};

export default React.memo(PickerCity);
