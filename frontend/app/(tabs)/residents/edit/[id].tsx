import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ResidentForm } from '@/components/resident/resident-form';
import { ResidentScreen } from '@/components/resident/resident-screen';
import { fetchResidentById, updateResident, type Resident } from '@/services/resident-api';

export default function ResidentEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [resident, setResident] = useState<Resident | null>(null);

  useEffect(() => {
    async function loadResident() {
      if (!id) {
        return;
      }

      try {
        const data = await fetchResidentById(id);
        setResident(data);
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
    }

    loadResident();
  }, [id]);

  return (
    <ResidentScreen title="Update Resident" subtitle="Edit profile and contact details">
      {resident && (
        <ResidentForm
          initialValues={resident}
          submitLabel="Update Resident"
          onSubmit={async (payload) => {
            if (!id) {
              return;
            }

            try {
              await updateResident(id, payload);
              Alert.alert('Success', 'Resident updated successfully.');
              router.replace(`/(tabs)/residents/${id}`);
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
            }
          }}
        />
      )}
    </ResidentScreen>
  );
}
