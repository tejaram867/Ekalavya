import { supabase } from '../core/supabase.js';

/**
 * Common data fetching utility for Ekalavya (Supabase Implementation)
 */
export const api = {
    /**
     * Get all documents from a collection (PostgreSQL table)
     */
    async getCollection(tableName) {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select('*');
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error fetching table ${tableName}:`, error);
            throw error;
        }
    },

    /**
     * Get documents with a specific filter
     */
    async getWhere(tableName, column, value) {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .eq(column, value);
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error filtering ${tableName} by ${column}:`, error);
            throw error;
        }
    },

    /**
     * Get a single document by ID
     */
    async getDocument(tableName, id) {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error fetching row ${id} from ${tableName}:`, error);
            throw error;
        }
    },

    /**
     * Create a new document in a table
     */
    async createDocument(tableName, payload) {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .insert([payload])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error(`Error creating document in ${tableName}:`, error);
            throw error;
        }
    },

    /**
     * Update an existing document
     */
    async updateDocument(tableName, id, payload) {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .update(payload)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error(`Error updating document ${id} in ${tableName}:`, error);
            throw error;
        }
    },

    /**
     * Delete a document
     */
    async deleteDocument(tableName, id) {
        try {
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error(`Error deleting document ${id} from ${tableName}:`, error);
            throw error;
        }
    }
};
