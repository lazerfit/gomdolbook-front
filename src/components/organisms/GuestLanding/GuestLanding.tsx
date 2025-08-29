import { styled } from 'styled-components';
import { useState } from 'react';
import { Screen } from '@/components/templates/Screen';
import readinglogImg from '@/assets/img/readinglogLanding.png';
import libraryImg from '@/assets/img/libraryLanding.png';
import collectionImg from '@/assets/img/collectionLanding.png';
import { AnimatePresence, motion } from 'framer-motion';
import { mediaMax } from '@/utils';

const Wrapper = styled(Screen)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-6);
`;

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
`;

const MainBanner = styled.h1`
  font-size: 3.2rem;

  ${mediaMax.mobile} {
    font-size: var(--font-size-3xl);
  }
`;

const SubBanner = styled.h2`
  font-family: 'Gowun Dodum', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--secondary-text);
  line-height: 1.6;

  ${mediaMax.mobile} {
    font-size: var(--font-size-xl);
  }
`;

const FeatureGrid = styled.div`
  display: flex;
  gap: var(--space-4);

  ${mediaMax.mobile} {
    display: none;
  }
`;

const FeatureCard = styled(motion.div)`
  border: 1px solid var(--grey6);
  border-radius: var(--radius-md);
  padding: var(--space-1);
`;

const FeatureImg = styled(motion.img)``;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  ${mediaMax.mobile} {
    display: none;
  }
`;

const ModalContent = styled(motion.div)`
  background: var(--background-light);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  position: relative;
`;

const features = [
  {
    id: 'feature-library',
    title: '내 서재',
    description: '읽는 중, 읽을 책, 다 읽은 책을 체계적으로 관리하세요.',
    screenshot: libraryImg,
    style: { width: '700px', height: '300px' },
  },
  {
    id: 'feature-reading-log',
    title: '독서 기록',
    description: '독서 관리와 깊이 있는 독서 노트를 작성해보세요.',
    screenshot: readinglogImg,
    style: { width: '300px' },
  },
  {
    id: 'feature-collection',
    title: '나만의 컬렉션',
    description: '테마별로 나만의 컬렉션을 만들어 책을 분류할 수 있습니다.',
    screenshot: collectionImg,
    style: { width: '700px', height: '350px' },
  },
];

const GuestLanding = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedFeature = features.find(feature => feature.id === selectedId);

  return (
    <Wrapper>
      <BannerContainer>
        <MainBanner>책을 넘어, 당신의 생각을 기록하세요</MainBanner>
        <SubBanner>
          흩어져 있던 독서 경험을 체계적으로 관리하고, 깊이 있는 기록을 통해
          <br />한 단계 더 성장하는 나를 발견해보세요!
        </SubBanner>
      </BannerContainer>

      <FeatureGrid>
        {features.map(feature => (
          <FeatureCard
            key={feature.id}
            onClick={() => setSelectedId(feature.id)}
            layoutId={feature.id}
            data-testid={feature.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <FeatureImg key={feature.id} style={feature.style} src={feature.screenshot} alt="Landing" />
          </FeatureCard>
        ))}
      </FeatureGrid>

      <AnimatePresence>
        {selectedId && selectedFeature && (
          <ModalOverlay
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <ModalContent layoutId={selectedId} onClick={() => setSelectedId(null)}>
              <motion.h2>{selectedFeature.title}</motion.h2>
              <motion.p>{selectedFeature.description}</motion.p>
              <motion.img src={selectedFeature.screenshot} alt={selectedFeature.title} style={{ maxHeight: '60vh' }} />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default GuestLanding;
