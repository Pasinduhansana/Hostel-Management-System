import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ResidentForm } from '@/components/resident/resident-form';
import { ResidentScreen } from '@/components/resident/resident-screen';
import { createResident } from '@/services/resident-api';

export default function ResidentCreateScreen() {
  const router = useRouter();

  return (
    <ResidentScreen
      title="Add Resident"
      subtitle="Create a new resident profile with personal details">
      <ResidentForm
        submitLabel="Create Resident"
        showTestFillButton
        onSubmit={async (payload) => {
          try {
            await createResident(payload);
            Alert.alert('Success', 'Resident created successfully.');
            router.replace('/(tabs)/residents');
          } catch (error) {
            Alert.alert('Error', (error as Error).message);
          }
        }}
      />
    </ResidentScreen>
  );
}
