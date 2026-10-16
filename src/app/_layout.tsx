import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mine oppgaver' }} />
      <Stack.Screen name="oppgave1" options={{ title: 'Oppgave 1' }} />
      <Stack.Screen name="oppgave2" options={{ title: 'Oppgave 2' }} />
      <Stack.Screen name="oppgave3" options={{ title: 'Oppgave 3' }} />
      <Stack.Screen name="oppgave4" options={{ title: 'Oppgave 4' }} />
      <Stack.Screen name="oppgave5" options={{ title: 'Oppgave 5' }} />
      <Stack.Screen name="oppgave6" options={{ title: 'Oppgave 6'}} />
      <Stack.Screen name="oppgave7" options={{ title: 'Oppgave 7'}} />
      <Stack.Screen name="oppgave8" options={{ title: 'Oppgave 8'}} />
    </Stack>
  );
}