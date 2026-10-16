import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export type TimerFormValues = {
  title: string;
  project: string;
};

type EditableTimerProps = {
  id: string;
  title: string;
  project: string;
  elapsed: string;
  isRunning?: boolean;
  editFormOpen?: boolean;
  onFormSubmit: (attrs: TimerFormValues & { id: string }) => void;
  onTrashClick: (timerId: string) => void;
  onStartClick: (timerId: string) => void;
  onStopClick: (timerId: string) => void;
  onEditClick: (timerId: string) => void;
  onFormClose: (timerId: string) => void;
};

const formatElapsed = (elapsedMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
};

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning = false,
  editFormOpen = false,
  onFormSubmit,
  onTrashClick,
  onStartClick,
  onStopClick,
  onEditClick,
  onFormClose,
}: EditableTimerProps) {
  const [draft, setDraft] = useState({ title, project });

  const handleSave = () => {
    const nextTitle = draft.title.trim();
    const nextProject = draft.project.trim();

    onFormSubmit({
      id,
      title: nextTitle || title,
      project: nextProject || project,
    });
  };

  const handleEdit = () => {
    setDraft({ title, project });
    onEditClick(id);
  };

  const handleCancel = () => {
    setDraft({ title, project });
    onFormClose(id);
  };

  if (editFormOpen) {
    return (
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={draft.title}
          onChangeText={(text) => setDraft((prev) => ({ ...prev, title: text }))}
          placeholder="Timer-navn"
        />
        <TextInput
          style={styles.input}
          value={draft.project}
          onChangeText={(text) => setDraft((prev) => ({ ...prev, project: text }))}
          placeholder="Prosjekt"
        />

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.primaryButton]} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>Lagre</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.secondaryButton]} onPress={handleCancel}>
            <Text style={styles.secondaryButtonText}>Avbryt</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.project}>{project}</Text>
        </View>
        <Text style={styles.elapsed}>{formatElapsed(Number(elapsed) || 0)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.dangerButton]} onPress={() => onTrashClick(id)}>
          <Text style={styles.buttonText}>Slett</Text>
        </Pressable>

        {isRunning ? (
          <Pressable style={[styles.button, styles.secondaryButton]} onPress={() => onStopClick(id)}>
            <Text style={styles.buttonText}>Stopp</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, styles.primaryButton]} onPress={() => onStartClick(id)}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        )}

        <Pressable style={[styles.button, styles.secondaryButton]} onPress={handleEdit}>
          <Text style={styles.buttonText}>Endre</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  project: {
    marginTop: 4,
    color: '#4b5563',
  },
  elapsed: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
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
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
