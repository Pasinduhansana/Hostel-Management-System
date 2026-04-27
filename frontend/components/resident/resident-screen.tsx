import type { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ResidentTheme } from '@/constants/resident-management-theme';

type ResidentScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  rightAction?: ReactNode;
  useScroll?: boolean;
}>;

export function ResidentScreen({
  title,
  subtitle,
  rightAction,
  useScroll = true,
  children,
}: ResidentScreenProps) {
  const body = useScroll ? (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  ) : (
    <View style={styles.container}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{title}</Text>
            {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {rightAction}
        </View>
      </View>
      {body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ResidentTheme.colors.pageBg,
  },
  headerContainer: {
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 14,
    paddingBottom: 20,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: ResidentTheme.fonts.heading,
    color: ResidentTheme.colors.textPrimary,
    fontFamily: ResidentTheme.fonts.family,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: ResidentTheme.fonts.small,
    color: ResidentTheme.colors.textSecondary,
    fontFamily: ResidentTheme.fonts.family,
    marginTop: 2,
  },
});
