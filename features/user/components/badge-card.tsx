import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Check, LucideIcon } from 'lucide-react-native'
import { View } from 'react-native';

interface BadgeProps {
  title: string;
  description: string;
  achieved: boolean;
  icon: LucideIcon
}

export const BadgeCard = ({
  title,
  description,
  achieved,
  icon
}: BadgeProps) => {

  return (
    <View className="w-[45%] mb-4">
      <Card
        size="sm"
        variant={achieved ? 'filled' : 'outline'}
        className={`w-full items-center rounded-3xl ${achieved
          ? 'bg-green-100 border-green-500 shadow-md'
          : 'bg-gray-100 border-gray-300'}`}
      >
        {achieved && (
          <Badge
            className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Icon as={Check} size="xs" className="text-white"/>
          </Badge>
        )}
        <VStack className="items-center">
          <Icon size={'xl'} as={icon} className="text-typography-500 m-2 w-4 h-4"/>
          <Text className="font-semibold">{title}</Text>
          <Text size="xs" className="text-center text-gray-500">
            {description}
          </Text>
        </VStack>
      </Card>
    </View>
  );
};