import React from 'react';
import { View, Image } from "react-native";
import { compactinator9000 } from './compactinator9000';

import Text from '../Text';
import { styles } from './styles';
import GithubButton from './GithubButton';

const Details = ({ item, withButton }) => {
  if (!item) return null;
  return (
    <View testID={`${item.id}_container`} key={item.id} style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.ownerImage} source={{uri: item.ownerAvatarUrl}}/>
        <View style={styles.basics} >
          <Text testID={`${item.id}_fullName`} fontWeight="bold" style={styles.text}  >{item.fullName}</Text>
          <Text testID={`${item.id}_description`} style={styles.text} color="textSecondary" >{item.description}</Text>
          <Text testID={`${item.id}_language`} tag >{item.language}</Text>
        </View>
      </View>
      <View style={styles.details} >
        <View style={styles.detail} >
          <Text testID={`${item.id}_stargazersCount`} fontWeight="bold" style={styles.text} >{compactinator9000(item.stargazersCount)}</Text>
          <Text color={`${item.id}_textSecondary`} >Stars</Text>
        </View>
        <View style={styles.detail} >
          <Text testID={`${item.id}_forksCount`} fontWeight="bold" style={styles.text} >{compactinator9000(item.forksCount)}</Text>
          <Text color="textSecondary" >Forks</Text>
        </View>
        <View style={styles.detail} >
          <Text testID={`${item.id}_reviewCount`} fontWeight="bold" style={styles.text} >{compactinator9000(item.reviewCount)}</Text>
          <Text color="textSecondary" >Reviews</Text>
        </View>
        <View style={styles.detail} >
          <Text testID={`${item.id}_ratingAverage`} fontWeight="bold" style={styles.text} >{item.ratingAverage}</Text>
          <Text color="textSecondary" >Rating</Text>
        </View>
      </View>
      {withButton && GithubButton(item.url)}
    </View>
  );
};

export default Details;