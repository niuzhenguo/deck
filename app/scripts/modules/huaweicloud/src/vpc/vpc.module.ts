import { module } from 'angular';

export const VPC_MODULE = 'spinnaker.huaweicloud.vpc';
module(VPC_MODULE, [require('./vpcTag.directive').name]);
