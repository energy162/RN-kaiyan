import configActions from './config';
import navigationActions from './navigation';
import categoryActions from './category';
import discoveryActions from './discovery';
import followActions from './follow';

module.exports = {
  ...configActions,
  ...navigationActions,
  ...categoryActions,
  ...discoveryActions,
  ...followActions,
};
