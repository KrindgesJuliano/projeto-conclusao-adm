import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, Text, StyleSheet } from "react-native";


function ButtonIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export const StyledButton = ({ title, onPress, color, icon, grow }: {
  title?: string,
  onPress: () => void,
  color: string,
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  grow?: number
}) => {
  return (
    <Pressable onPress={onPress} style={{ ...styles.button, backgroundColor: color, flexGrow: grow }}>
      <Text style={styles.buttonText}>{title}</Text>
      {icon == null ? null : <ButtonIcon name={icon} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

