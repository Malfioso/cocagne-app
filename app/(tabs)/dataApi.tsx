// app/(tabs)/explore.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Depot } from './types/depot';

export default function ExploreScreen() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepots = async () => {
    try {
      const response = await fetch(
        'https://qjnieztpwnwroinqrolm.supabase.co/rest/v1/detail_depots',
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbmllenRwd253cm9pbnFyb2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MTEwNTAsImV4cCI6MjA1MzM4NzA1MH0.orLZFmX3i_qR0H4H6WwhUilNf5a1EAfrFhbbeRvN41M'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setDepots(data as Depot[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch depots');
      console.error('Error fetching depots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepots();
  }, []);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Explore Depots',
          headerShown: true,
        }} 
      />
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollContainer}>
            {depots.map((depot) => (
              <View key={depot.depot_id} style={styles.depotCard}>
                <Text style={styles.depotName}>{depot.depot}</Text>
                <Text style={styles.depotInfo}>Capacité: {depot.capacite}</Text>
                <Text style={styles.depotInfo}>
                  {depot.adresse ? `${depot.adresse}, ` : ''}
                  {depot.codepostal} {depot.ville}
                </Text>
                {depot.contact && (
                  <Text style={styles.depotInfo}>Contact: {depot.contact}</Text>
                )}
                {depot.telephone && (
                  <Text style={styles.depotInfo}>Tél: {depot.telephone}</Text>
                )}
                {depot.localisation && (
                  <Text style={styles.depotInfo}>
                    Coordinates: {depot.localisation.coordinates.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  depotCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  depotName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  depotInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});