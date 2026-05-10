import { api } from '../services/api.js';

/**
 * Smart Resource Bridge
 * Logic to connect Mentoring sessions, Library resources, and Scholarships
 */
export const recommendationEngine = {
    /**
     * Finds related library resources for a given topic
     */
    async getRelatedResources(topic) {
        try {
            const allResources = await api.getCollection('library_assets');
            // Simple keyword matching for MVP
            return allResources.filter(r => 
                r.topic.toLowerCase().includes(topic.toLowerCase()) ||
                topic.toLowerCase().includes(r.topic.toLowerCase())
            ).slice(0, 3);
        } catch (error) {
            console.error('Error fetching related resources:', error);
            return [];
        }
    },

    /**
     * Finds scholarships related to a user's interests or mentored topics
     */
    async getTargetedScholarships(userProfile, recentTopics = []) {
        try {
            const allScholarships = await api.getCollection('scholarships');
            
            return allScholarships.filter(s => {
                const matchesDegree = userProfile.degree ? s.degree?.toLowerCase() === userProfile.degree.toLowerCase() : true;
                const matchesRegion = userProfile.region ? s.region?.toLowerCase() === userProfile.region.toLowerCase() : true;
                const matchesTopic = recentTopics.some(topic => 
                    s.description?.toLowerCase().includes(topic.toLowerCase()) ||
                    s.name.toLowerCase().includes(topic.toLowerCase())
                );
                
                return (matchesDegree && matchesRegion) || matchesTopic;
            }).slice(0, 3);
        } catch (error) {
            console.error('Error fetching targeted scholarships:', error);
            return [];
        }
    }
};
