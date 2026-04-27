import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { InsightsPanel } from '@/components/resident/insights-panel';
import { ResidentCard } from '@/components/resident/resident-card';
import { ResidentScreen } from '@/components/resident/resident-screen';
import { ResidentSearchBar } from '@/components/resident/resident-search-bar';
import { ResidentTheme } from '@/constants/resident-management-theme';
import {
  deleteResident,
  fetchResidents,
  fetchResidentSummary,
  type Resident,
  type ResidentSummary,
} from '@/services/resident-api';

export default function ResidentListScreen() {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [summary, setSummary] = useState<ResidentSummary | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [list, insight] = await Promise.all([
        fetchResidents(searchText),
        fetchResidentSummary(),
      ]);
      setResidents(list);
      setSummary(insight);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function confirmDelete(id: string) {
    Alert.alert('Delete Resident', 'Are you sure you want to delete this resident?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteResident(id);
            await loadData();
          } catch (error) {
            Alert.alert('Error', (error as Error).message);
          }
        },
      },
    ]);
  }

  return (
    <ResidentScreen
      title="Resident Management"
      subtitle="Manage resident records, ratings, and contact data"
      useScroll={false}
      rightAction={
        <Pressable style={styles.addButton} onPress={() => router.push('/(tabs)/residents/new')}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      }>
      <InsightsPanel summary={summary} />
      <ResidentSearchBar value={searchText} onChangeText={setSearchText} />

      <FlatList
        data={residents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{loading ? 'Loading...' : 'No residents found.'}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.listItemWrap}>
            <ResidentCard resident={item} onPress={(id) => router.push(`/(tabs)/residents/${id}`)} />
            <Pressable style={styles.quickDelete} onPress={() => confirmDelete(item.id)}>
              <Text style={styles.quickDeleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </ResidentScreen>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: ResidentTheme.colors.brand,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: ResidentTheme.fonts.small,
    fontFamily: ResidentTheme.fonts.family,
  },
  listContent: {
    gap: 10,
    paddingBottom: 48,
  },
  listItemWrap: {
    gap: 6,
  },
  quickDelete: {
    alignSelf: 'flex-end',
    backgroundColor: '#FEE2E2',
    borderRadius: ResidentTheme.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quickDeleteText: {
    color: ResidentTheme.colors.danger,
    fontSize: ResidentTheme.fonts.tiny,
    fontWeight: '700',
    fontFamily: ResidentTheme.fonts.family,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: ResidentTheme.colors.textSecondary,
    fontFamily: ResidentTheme.fonts.family,
    fontSize: ResidentTheme.fonts.small,
  },
});
