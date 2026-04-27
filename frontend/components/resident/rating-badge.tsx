import { StyleSheet, Text, View } from 'react-native';

import { ResidentTheme } from '@/constants/resident-management-theme';

type RatingBadgeProps = {
  rating: number;
};

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{rating.toFixed(1)} / 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: ResidentTheme.colors.brandSoft,
    borderRadius: ResidentTheme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: ResidentTheme.fonts.tiny,
    fontWeight: '700',
    color: ResidentTheme.colors.brand,
    fontFamily: ResidentTheme.fonts.family,
  },
});
