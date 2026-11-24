import React, { useState } from 'react';
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { C } from './src/theme';
import PlanScreen from './src/screens/PlanScreen';
import RecordScreen from './src/screens/RecordScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const TABS = [
  { id: 'plan', label: 'Pianifica' },
  { id: 'record', label: 'Registra' },
  { id: 'history', label: 'Storico' },
];

export default function App() {
  const [tab, setTab] = useState('plan');
  const [guide, setGuide] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [openId, setOpenId] = useState(null);
  // Le schermate restano montate: la registrazione non si interrompe cambiando scheda.
  const pane = (id) => ({ flex: 1, display: tab === id ? 'flex' : 'none' });

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={pane('plan')}>
        <PlanScreen onStart={(r) => { setGuide(r); setTab('record'); }} />
      </View>
      <View style={pane('record')}>
        <RecordScreen
          guide={guide}
          onClearGuide={() => setGuide(null)}
          onSaved={(session) => { setOpenId(session.id); setRefresh((n) => n + 1); setTab('history'); }}
        />
      </View>
      <View style={pane('history')}>
        <HistoryScreen refreshKey={refresh} openId={openId} />
      </View>
      <View style={s.tabs}>
        {TABS.map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id)} style={s.tab} accessibilityRole="tab">
            <Text style={[s.tabText, tab === t.id && s.tabOn]}>{t.label}</Text>
            <View style={[s.bar, tab === t.id && { backgroundColor: C.lane }]} />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  tabs: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#DCE3E5', backgroundColor: '#fff' },
  tab: { flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center', gap: 6 },
  tabText: { color: C.muted, fontWeight: '600', fontSize: 15 },
  tabOn: { color: C.ink, fontWeight: '800' },
  bar: { width: 28, height: 3, borderRadius: 2, backgroundColor: 'transparent' },
});
