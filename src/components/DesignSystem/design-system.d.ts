import DSButton from '@/components/DesignSystem/Button/index.vue';
import DSContainer from '@/components/DesignSystem/Container/index.vue';
import DSCard from '@/components/DesignSystem/Card/index.vue';
import DSHeader from '@/components/DesignSystem/Header/index.vue';
import DSHTMLRenderer from '@/components/DesignSystem/HTMLRenderer/index.vue';
import DSImageWithPlaceholder from '@/components/DesignSystem/ImageWithPlaceholder/index.vue';
import DSLoading from '@/components/DesignSystem/Loading/index.vue';

// NOTE: This config is added to allow type inference
//       when importing the component(s) as Global component(s)
declare module 'vue' {
  export interface GlobalComponents {
    DSButton: typeof DSButton;
    DSContainer: typeof DSContainer;
    DSCard: typeof DSCard;
    DSHeader: typeof DSHeader;
    DSHTMLRenderer: typeof DSHTMLRenderer;
    DSImageWithPlaceholder: typeof DSImageWithPlaceholder;
    DSLoading: typeof DSLoading;
  }
}

export {};
