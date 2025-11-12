import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { Card, Typography, Input, LoadingSpinner } from "@components/common";
import { mockApiService } from "@services";
import { colors, spacing } from "@theme";
import { useDebounce } from "@hooks/useDebounced";
import { useClinicData } from "@hooks/useClinicData";

interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

const RENDER_BATCH_SIZE = 6;

export const ClinicsScreen: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(RENDER_BATCH_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);

 // Intentionally inefficient - fetches all clinics every time
  const loadClinics = async (): Promise<Clinic[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street`,
      rating: Math.random() * 5,
    }));
  };

  const { data: clinics, loading, error, refetch } = useClinicData<Clinic>(loadClinics, "clinic");

  const displayedClinics = useMemo(() => {
    const activeQuery = debouncedSearch.trim().toLowerCase();
    const filtered = !activeQuery
      ? clinics
      : clinics.filter(
          (c) =>
            c.name.toLowerCase().includes(activeQuery) ||
            c.address.toLowerCase().includes(activeQuery)
        );
    return filtered.slice(0, visibleCount);
  }, [clinics, debouncedSearch, visibleCount]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + RENDER_BATCH_SIZE);
  }, []);

  const renderClinic: ListRenderItem<Clinic> = useCallback(
    ({ item }: { item: any }) => (
      <Card style={styles.clinicCard}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="body2">{item.address}</Typography>
        <Typography variant="body2">
          Rating: {item.rating.toFixed(1)}
        </Typography>
      </Card>
    ),
    []
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search clinics..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={displayedClinics}
        renderItem={renderClinic}
        keyExtractor={(item) => item.id}
        initialNumToRender={RENDER_BATCH_SIZE}
        maxToRenderPerBatch={RENDER_BATCH_SIZE}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  searchInput: {
    marginBottom: spacing.md,
  },
  clinicCard: {
    marginBottom: spacing.sm,
  },
});
