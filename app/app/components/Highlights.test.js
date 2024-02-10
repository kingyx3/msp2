import React from 'react';
import { render } from '@testing-library/react-native';
import { SuperClean, SelfCheckin, Clean, SuperHost, Location, FreeCancellation } from './Highlights'; // Replace with your actual file name

const renderAndTestComponent = (Component, textToTest) => {
  it(`renders ${Component.name} correctly`, () => {
    const { getByText } = render(<Component />);
    textToTest.forEach(text => {
      expect(getByText(text)).toBeTruthy();
    });
  });
};

describe('Amenity Components', () => {
  describe('SuperClean Component', () => {
    renderAndTestComponent(SuperClean, ['청결 강화', '이 호스트는 공중보건 및 숙박업계 최고의 전문가들과 협력하여 개발한 엄격한 청결 강화 기준을 준수합니다.']);
  });

  describe('SelfCheckin Component', () => {
    renderAndTestComponent(SelfCheckin, ['셀프 체크인', '키패드를 이용해 체크인하세요']);
  });

  describe('Clean Component', () => {
    renderAndTestComponent(Clean, ['깨끗하고 깔끔한 숙소', '최근 게스트 13명이 이 숙소가 티 없이 깨끗하다고 후기를 남겼습니다']);
  });

  describe('SuperHost Component', () => {
    renderAndTestComponent(SuperHost, ['님은 슈퍼호스트입니다', '슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.']);
  });

  describe('Location Component', () => {
    renderAndTestComponent(Location, ['훌륭한 숙소 위치', '최근 숙박한 게스트 중 94%가 위치에 별점 5점을 준 숙소입니다.']);
  });

  describe('FreeCancellation Component', () => {
    renderAndTestComponent(FreeCancellation, ['7월 29일까지 무료 취소 가능', '그 이후 8월 7일 3:00 PM 전에 예약을 취소하면 서비스 수수료를 제외한 요금 전액이 환불됩니다.']);
  });

  // Repeat for other components
});
