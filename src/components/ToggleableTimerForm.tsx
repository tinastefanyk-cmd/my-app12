import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { TimerFormValues } from './EditableTimer';

type ToggleableTimerFormProps = {
  onFormSubmit: (timer: TimerFormValues) => void;
};

export default function ToggleableTimerForm({ onFormSubmit }: ToggleableTimerFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');

  const resetForm = () => {
    setTitle('');
    setProject('');
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const nextTitle = title.trim();
    const nextProject = project.trim();

    if (!nextTitle || !nextProject) {
      return;
    }

    onFormSubmit({ title: nextTitle, project: nextProject });
    resetForm();
  };

  if (!isOpen) {
    return (
      <Pressable style={styles.toggleButton} onPress={() => setIsOpen(true)}>
        <Text style={styles.toggleText}>+ Ny timer</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.formCard}>
      <Text style={styles.title}>Legg til ny timer</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Timer-navn"
      />
      <TextInput
        style={styles.input}
        value={project}
        onChangeText={setProject}
        placeholder="Prosjekt"
      />

      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.primaryButton]} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Lagre</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={resetForm}>
          <Text style={styles.secondaryButtonText}>Avbryt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
  },
  toggleText: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
  formCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  title: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
});
