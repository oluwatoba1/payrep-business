import React from 'react';
import { View, TextInput, Image, StyleSheet, TextInputProps } from 'react-native';
import ComponentImages from '../../../../assets/images/components';
import { styles } from './styles';


interface SearchInputProps extends TextInputProps {
    searchPlaceholder: string|undefined;
    searchText: string;
    onSearch: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchPlaceholder, searchText, onSearch, ...rest }) => {
    return (
        <View style={styles.searchContainer}>
            <Image source={ComponentImages.dropdDown.search} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor="#828A8E"
                value={searchText}
                onChangeText={onSearch}
                {...rest}
            />
        </View>
    );
};

export default SearchInput;
