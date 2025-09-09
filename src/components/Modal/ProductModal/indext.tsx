import { Pressable, View } from "react-native";
import { Typography } from "../../Forms";
import { modalMainStyles } from "../styles";
import SearchModal from "../SearchModal";
import Colors from "../../../theme/Colors";

interface IDropdownItem {
  name: string;
  code: string;
  amount: string;
}


interface ProductModalProps {
  showModal: boolean;
  options: IDropdownItem[];
  value: string;
  onClose: () => void;
  onSelect: (item: IDropdownItem) => void;
  provider: string;
}
export default function ProductModal({
  showModal,
  onClose,
  onSelect,
  options,
  provider
}:ProductModalProps) {
    const renderDropdownItem = (item: IDropdownItem) =>  (
        <Pressable onPress={() => onSelect(item)} style={modalMainStyles.list}>
          <View>
          <Typography title={item.name} type='body-r' color={Colors.gray['400']} />
          </View>
          <View style={modalMainStyles.textContainer}>
            <Typography title={`N${item.amount}`} type='label-sb' color={Colors.gray['400']}/>
          </View>
        </Pressable>
      );
    
      return (
        <SearchModal<IDropdownItem>
          showModal={showModal}
          onClose={onClose}
          options={options}
          value=""
          onSelect={onSelect}
          title={`Select ${provider} Plan`}
          searchPlaceholder="Search Plan"
          renderDropdownItem={renderDropdownItem}
        />
      );
}