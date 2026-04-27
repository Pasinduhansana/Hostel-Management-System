import { StyleSheet, TextInput, View } from 'react-native';

import { ResidentTheme } from '@/constants/resident-management-theme';

type ResidentSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function ResidentSearchBar({ value, onChangeText }: ResidentSearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name, room, email, phone"
        placeholderTextColor={ResidentTheme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ResidentTheme.colors.cardBg,
    borderRadius: ResidentTheme.radius.md,
    borderWidth: 1,
    borderColor: ResidentTheme.colors.border,
    paddingHorizontal: 10,
  },
  input: {
    height: 42,
    fontFamily: ResidentTheme.fonts.family,
    fontSize: ResidentTheme.fonts.small,
    color: ResidentTheme.colors.textPrimary,
  },
});
