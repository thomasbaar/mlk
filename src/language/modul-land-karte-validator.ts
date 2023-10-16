import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { ModulLandKarteAstType, Person } from './generated/ast.js';
import type { ModulLandKarteServices } from './modul-land-karte-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: ModulLandKarteServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.ModulLandKarteValidator;
    const checks: ValidationChecks<ModulLandKarteAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class ModulLandKarteValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
