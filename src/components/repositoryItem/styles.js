import theme from '../../theme';
import { StyleSheet } from 'react-native';

// TODO: break this down
export const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.primary
  },
  basics:{
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    flexWrap: "wrap",
  },
  details:{
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detail:{
    marginRight: 10,
    padding: 5,
    flexDirection: "column",
  },
  text:{
    marginBottom: 10,
    flexWrap: "wrap",
  },
  ownerImage:{
    marginLeft: 10,
    padding: 1,
    width: 75,
    height: 75,
    borderRadius: 15,
    borderColor: "black",
    overflow: "hidden",
  },
  githubButton: {
    backgroundColor: theme.colors.tertiary,
    margin: 5,
    borderRadius: 5,
    padding: 5,
  },
  githubButtonText: {
    textAlign: "center",
    color: theme.colors.textTertiary,
  },
});
