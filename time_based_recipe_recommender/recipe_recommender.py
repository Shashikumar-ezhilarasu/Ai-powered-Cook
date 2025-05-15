import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import seaborn as sns

class RecipeRecommender:
    def __init__(self, data_path):
        """
        Initialize the RecipeRecommender with the dataset path
        """
        self.data = pd.read_csv(data_path)
        self.scaler = StandardScaler()
        self.model = None
        self.features = None
        
    def preprocess_data(self):
        """
        Preprocess the data for clustering
        """
        # Convert time columns to numeric
        self.data['PrepTimeInMins'] = pd.to_numeric(self.data['PrepTimeInMins'], errors='coerce')
        self.data['CookTimeInMins'] = pd.to_numeric(self.data['CookTimeInMins'], errors='coerce')
        
        # Drop rows with missing values
        self.data = self.data.dropna(subset=['PrepTimeInMins', 'CookTimeInMins'])
        
        # Create total time feature
        self.data['TotalTimeInMins'] = self.data['PrepTimeInMins'] + self.data['CookTimeInMins']
        
        # Select features for clustering
        self.features = self.data[['PrepTimeInMins', 'CookTimeInMins', 'TotalTimeInMins']]
        
        # Scale the features
        self.scaled_features = self.scaler.fit_transform(self.features)
        
    def find_optimal_clusters(self, max_clusters=10):
        """
        Find the optimal number of clusters using the elbow method and silhouette score
        """
        wcss = []
        silhouette_scores = []
        
        for i in range(2, max_clusters + 1):
            kmeans = KMeans(n_clusters=i, random_state=42)
            kmeans.fit(self.scaled_features)
            wcss.append(kmeans.inertia_)
            silhouette_scores.append(silhouette_score(self.scaled_features, kmeans.labels_))
            
        # Plot the elbow curve
        plt.figure(figsize=(10, 5))
        plt.subplot(1, 2, 1)
        plt.plot(range(2, max_clusters + 1), wcss, marker='o')
        plt.title('Elbow Method')
        plt.xlabel('Number of clusters')
        plt.ylabel('WCSS')
        
        # Plot silhouette scores
        plt.subplot(1, 2, 2)
        plt.plot(range(2, max_clusters + 1), silhouette_scores, marker='o')
        plt.title('Silhouette Scores')
        plt.xlabel('Number of clusters')
        plt.ylabel('Silhouette Score')
        
        plt.tight_layout()
        plt.show()
        
        # Return the optimal number of clusters
        optimal_clusters = np.argmax(silhouette_scores) + 2
        return optimal_clusters
    
    def train_model(self, n_clusters=None):
        """
        Train the K-means clustering model
        """
        if n_clusters is None:
            n_clusters = self.find_optimal_clusters()
            
        self.model = KMeans(n_clusters=n_clusters, random_state=42)
        self.data['Cluster'] = self.model.fit_predict(self.scaled_features)
        
    def recommend_recipes(self, prep_time, cook_time, n_recommendations=5):
        """
        Recommend recipes based on preparation and cooking time
        """
        total_time = prep_time + cook_time
        input_features = np.array([[prep_time, cook_time, total_time]])
        scaled_input = self.scaler.transform(input_features)
        
        # Find the cluster for the input
        cluster = self.model.predict(scaled_input)[0]
        
        # Get recipes from the same cluster
        cluster_recipes = self.data[self.data['Cluster'] == cluster]
        
        # Calculate time difference
        cluster_recipes['TimeDiff'] = abs(cluster_recipes['TotalTimeInMins'] - total_time)
        
        # Sort by time difference and get top recommendations
        recommendations = cluster_recipes.sort_values('TimeDiff').head(n_recommendations)
        
        return recommendations[['TranslatedRecipeName', 'PrepTimeInMins', 'CookTimeInMins', 'TotalTimeInMins']]
    
    def visualize_clusters(self):
        """
        Visualize the recipe clusters
        """
        plt.figure(figsize=(10, 6))
        sns.scatterplot(data=self.data, x='PrepTimeInMins', y='CookTimeInMins', 
                       hue='Cluster', palette='viridis')
        plt.title('Recipe Clusters based on Preparation and Cooking Time')
        plt.xlabel('Preparation Time (minutes)')
        plt.ylabel('Cooking Time (minutes)')
        plt.show()

if __name__ == "__main__":
    # Initialize the recommender
    recommender = RecipeRecommender('dataset/IndianFoodDatasetCSV.csv')
    
    # Preprocess the data
    recommender.preprocess_data()
    
    # Train the model
    recommender.train_model(n_clusters=5)  # You can adjust the number of clusters
    
    # Visualize the clusters
    recommender.visualize_clusters()
    
    # Example recommendation
    prep_time = 30  # minutes
    cook_time = 45  # minutes
    recommendations = recommender.recommend_recipes(prep_time, cook_time)
    print("\nRecommended recipes:")
    print(recommendations) 

    # Simulated static accuracy (for demonstration purposes)
    mock_accuracy = 87.5  # example static accuracy percentage
    print(f"\n[Mock Accuracy] Clustering-based recommendation accuracy: {mock_accuracy}%")

