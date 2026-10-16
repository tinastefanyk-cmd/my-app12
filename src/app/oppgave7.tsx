import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import EditableTimer, { type TimerFormValues } from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';

type Timer = {
  id: string;
  title: string;
  project: string;
  elapsed: number;
  isRunning: boolean;
  editFormOpen?: boolean;
};

export default function App() {
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: '1',
      title: 'Klippe plenen',
      project: 'Hageaktivitet',
      elapsed: 8986300,
      isRunning: true,
    },
    {
      id: '2',
      title: 'Bake kake',
      project: 'Kjøkkenaktivitet',
      elapsed: 3890985,
      isRunning: false,
      editFormOpen: false,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning) {
            return { ...timer, elapsed: timer.elapsed + 1000 };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateFormSubmit = (timer: TimerFormValues) => {
    const newTimer: Timer = {
      id: Math.random().toString(),
      title: timer.title,
      project: timer.project,
      elapsed: 0,
      isRunning: false,
    };

    setTimers((prevTimers) => [newTimer, ...prevTimers]);
  };

  const handleUpdateFormSubmit = (attrs: TimerFormValues & { id: string }) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === attrs.id) {
          return {
            ...timer,
            title: attrs.title,
            project: attrs.project,
            editFormOpen: false,
          };
        }
        return timer;
      })
    );
  };

  const handleDeleteClick = (timerId: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== timerId));
  };

  const handleStartClick = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, isRunning: true };
        }
        return timer;
      })
    );
  };

  const handleStopClick = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, isRunning: false };
        }
        return timer;
      })
    );
  };

  const handleEditClick = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, editFormOpen: true };
        }
        return timer;
      })
    );
  };

  const handleFormClose = (timerId: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, editFormOpen: false };
        }
        return timer;
      })
    );
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tidsmålere</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
        {timers.map((timer) => (
          <EditableTimer
            key={timer.id}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            elapsed={timer.elapsed.toString()}
            isRunning={timer.isRunning}
            editFormOpen={timer.editFormOpen}
            onFormSubmit={handleUpdateFormSubmit}
            onTrashClick={handleDeleteClick}
            onStartClick={handleStartClick}
            onStopClick={handleStopClick}
            onEditClick={handleEditClick}
            onFormClose={handleFormClose}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});
