import { ILoadBalancerModalProps } from '@spinnaker/core';

import { IHuaweiCloudLoadBalancerUpsertCommand } from 'huaweicloud/domain';

import { CreateApplicationLoadBalancer } from './application/CreateApplicationLoadBalancer';
import { CreateClassicLoadBalancer } from './classic/CreateClassicLoadBalancer';
import { CreateNetworkLoadBalancer } from './network/CreateNetworkLoadBalancer';

export interface ICloseableLoadBalancerModal extends React.ComponentClass<ILoadBalancerModalProps> {
  show: (props: ILoadBalancerModalProps) => Promise<IHuaweiCloudLoadBalancerUpsertCommand>;
}

export interface IHuaweiCloudLoadBalancerConfig {
  type: string;
  label: string;
  sublabel: string;
  description: string;
  component: ICloseableLoadBalancerModal;
}

export const LoadBalancerTypes: IHuaweiCloudLoadBalancerConfig[] = [
  {
    type: 'application',
    label: 'Application',
    sublabel: 'ALB',
    description: 'Highly configurable, application-focused balancer. HTTP and HTTPS only.',
    component: CreateApplicationLoadBalancer,
  },
  {
    type: 'network',
    label: 'Network',
    sublabel: 'NLB',
    description: 'Basic, high-performance balancer with fixed IP.',
    component: CreateNetworkLoadBalancer,
  },
  {
    type: 'classic',
    label: 'Classic',
    sublabel: 'Legacy',
    description: 'Previous generation balancer (ELB).',
    component: CreateClassicLoadBalancer,
  },
];
