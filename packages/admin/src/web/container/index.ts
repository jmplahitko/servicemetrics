import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from 'awilix';
import { authSettings } from '../security/auth/authSettings';
import createAuthService from '../security/auth/createAuthService';

const container = createContainer({
	injectionMode: InjectionMode.CLASSIC,
	strict: true
});

// config


// services
container.register({
	'authSettings': asValue(authSettings),
	'authService': asFunction(createAuthService, { lifetime: Lifetime.SINGLETON }),
})
container.loadModules(['./src/services/*Service.ts'], {
	formatName: 'camelCase',
	resolverOptions: { register: asFunction }
});

// business
container.loadModules(['./src/business/*Manager.ts'], {
	formatName: 'camelCase',
	resolverOptions: { register: asClass }
});

// persistence
container.loadModules(['./src/persistence/*Repository.ts'], {
	formatName: 'camelCase',
	resolverOptions: { register: asClass }
});

export default container;